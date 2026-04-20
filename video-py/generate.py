"""Generate the safety cover PR video with narration audio using moviepy."""

import os
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from moviepy import (
    VideoClip,
    AudioFileClip,
    CompositeVideoClip,
    CompositeAudioClip,
    ColorClip,
    ImageClip,
    vfx,
)
from slides import SLIDES, IMAGES_DIR, FPS, WIDTH, HEIGHT, COLORS, AUDIO_PADDING, ENDCARD_DURATION
from narration import get_audio_duration

AUDIO_DIR = os.path.join(os.path.dirname(__file__), "audio")
OUT_DIR = os.path.join(os.path.dirname(__file__), "out")
FONT_PATH = "/System/Library/Fonts/ヒラギノ角ゴシック W6.ttc"
FONT_PATH_BOLD = "/System/Library/Fonts/ヒラギノ角ゴシック W9.ttc"

NARRATION_SPEED = 1.2


def hex_to_rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i : i + 2], 16) for i in (0, 2, 4))


def load_and_crop(image_path):
    img = Image.open(image_path).convert("RGB")
    iw, ih = img.size
    target_ratio = WIDTH / HEIGHT
    current_ratio = iw / ih
    if current_ratio > target_ratio:
        new_w = int(ih * target_ratio)
        left = (iw - new_w) // 2
        img = img.crop((left, 0, left + new_w, ih))
    elif current_ratio < target_ratio:
        new_h = int(iw / target_ratio)
        top = (ih - new_h) // 2
        img = img.crop((0, top, iw, top + new_h))
    return img.resize((WIDTH, HEIGHT), Image.LANCZOS)


def apply_gradient_overlay(pil_img, tone):
    """Apply gradient overlay directly onto a PIL image."""
    opacity = 0.55 if tone == "dark" else 0.35
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    for y in range(HEIGHT):
        alpha_factor = 0.3 + 0.7 * (y / HEIGHT)
        a = int(255 * opacity * alpha_factor)
        draw.line([(0, y), (WIDTH, y)], fill=(0, 0, 0, a))

    base = pil_img.convert("RGBA")
    return Image.alpha_composite(base, overlay)


def draw_narration_text(pil_img, text, font_size=46, position="bottom"):
    """Draw narration text with shadow directly onto a PIL image."""
    font = ImageFont.truetype(FONT_PATH_BOLD, font_size)
    draw = ImageDraw.Draw(pil_img)
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]

    tx = (WIDTH - tw) // 2
    if position == "bottom":
        ty = HEIGHT - th - 80
    else:
        ty = (HEIGHT - th) // 2

    shadow_offset = 3
    draw.text((tx + shadow_offset, ty + shadow_offset), text, font=font, fill=(0, 0, 0, 180))
    draw.text((tx, ty), text, font=font, fill=(255, 255, 255, 255))
    return pil_img


def make_image_slide(image_path, duration, zoom_dir, tone, text):
    """Create a Ken Burns slide with overlay and text baked in."""
    base_img = load_and_crop(image_path)

    if zoom_dir == "in":
        start_scale, end_scale = 1.0, 1.15
    else:
        start_scale, end_scale = 1.15, 1.0

    base_array = np.array(base_img)

    def make_frame(t):
        progress = t / duration if duration > 0 else 0
        scale = start_scale + (end_scale - start_scale) * progress

        h, w = base_array.shape[:2]
        new_w = int(w * scale)
        new_h = int(h * scale)

        pil_img = Image.fromarray(base_array)
        pil_img = pil_img.resize((new_w, new_h), Image.LANCZOS)

        left = (new_w - w) // 2
        top = (new_h - h) // 2
        pil_img = pil_img.crop((left, top, left + w, top + h))

        pil_img = apply_gradient_overlay(pil_img, tone)
        pil_img = draw_narration_text(pil_img, text)

        return np.array(pil_img.convert("RGB"))

    return VideoClip(make_frame, duration=duration).with_fps(FPS)


def make_gradient_bg(width, height):
    """Create a gradient background image."""
    bg_color1 = hex_to_rgb(COLORS["bg"])
    bg_color2 = hex_to_rgb(COLORS["bg_end"])
    img = Image.new("RGB", (width, height))
    pixels = img.load()
    for y in range(height):
        for x in range(width):
            t = (x + y) / (width + height)
            r = int(bg_color1[0] + (bg_color2[0] - bg_color1[0]) * t)
            g = int(bg_color1[1] + (bg_color2[1] - bg_color1[1]) * t)
            b = int(bg_color1[2] + (bg_color2[2] - bg_color1[2]) * t)
            pixels[x, y] = (r, g, b)
    return img


def make_bridge_clip(text, duration):
    img = make_gradient_bg(WIDTH, HEIGHT)
    draw = ImageDraw.Draw(img)

    font = ImageFont.truetype(FONT_PATH_BOLD, 62)
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]

    tx = (WIDTH - tw) // 2
    ty = (HEIGHT - th) // 2 - 20
    draw.text((tx, ty), text, font=font, fill=(255, 255, 255))

    bar_w, bar_h = 120, 4
    bar_color = hex_to_rgb(COLORS["accent"])
    bx = (WIDTH - bar_w) // 2
    by = ty + th + 30
    draw.rectangle([bx, by, bx + bar_w, by + bar_h], fill=bar_color)

    return ImageClip(np.array(img), duration=duration).with_fps(FPS)


def make_endcard_clip(duration):
    img = make_gradient_bg(WIDTH, HEIGHT)
    draw = ImageDraw.Draw(img)

    accent = hex_to_rgb(COLORS["accent"])
    white = (255, 255, 255)
    gold = hex_to_rgb(COLORS["gold"])

    font_sub = ImageFont.truetype(FONT_PATH, 24)
    font_main = ImageFont.truetype(FONT_PATH_BOLD, 72)
    font_url = ImageFont.truetype(FONT_PATH, 36)
    font_cta = ImageFont.truetype(FONT_PATH_BOLD, 32)

    lines = [
        ("設備カバー製作", font_sub, accent, 0),
        ("岩代工業株式会社", font_main, white, 50),
        (None, None, None, 130),
        ("iwashiro.co.jp/safety-cover/", font_url, white, 170),
        ("ご相談無料 | お気軽にお問い合わせください", font_cta, gold, 230),
    ]

    base_y = HEIGHT // 2 - 160
    for text, font, color, y_offset in lines:
        if text is None:
            bar_w, bar_h = 200, 4
            bx = (WIDTH - bar_w) // 2
            by = base_y + y_offset
            draw.rectangle([bx, by, bx + bar_w, by + bar_h], fill=accent)
            continue
        bbox = draw.textbbox((0, 0), text, font=font)
        tw = bbox[2] - bbox[0]
        tx = (WIDTH - tw) // 2
        draw.text((tx, base_y + y_offset), text, font=font, fill=color)

    return ImageClip(np.array(img), duration=duration).with_fps(FPS)


def compute_timing():
    timed = []
    current = 0.0
    for slide in SLIDES:
        sid = slide["id"]
        if slide["type"] == "endcard":
            duration = ENDCARD_DURATION
        else:
            audio_dur = get_audio_duration(sid)
            duration = audio_dur / NARRATION_SPEED + AUDIO_PADDING if audio_dur > 0 else 4.0

        timed.append({**slide, "start": current, "duration": duration})
        current += duration
    return timed, current


def build_video():
    os.makedirs(OUT_DIR, exist_ok=True)

    timed_slides, total_duration = compute_timing()
    print(f"Total duration: {total_duration:.1f}s (narration speed: {NARRATION_SPEED}x)")

    clips = []
    audio_clips = []

    for slide in timed_slides:
        sid = slide["id"]
        duration = slide["duration"]
        start = slide["start"]
        slide_type = slide["type"]

        print(f"Building slide {sid} ({slide_type}, {duration:.1f}s, @{start:.1f}s)...")

        if slide_type == "image":
            image_path = os.path.join(IMAGES_DIR, slide["image"])
            display_text = slide.get("subtitle", slide["narration"])
            clip = make_image_slide(image_path, duration, slide["zoom"], slide["tone"], display_text)

        elif slide_type == "bridge":
            clip = make_bridge_clip(slide["narration"], duration)

        elif slide_type == "endcard":
            clip = make_endcard_clip(duration)

        clips.append(clip.with_start(start))

        audio_path = os.path.join(AUDIO_DIR, f"slide_{sid:02d}.mp3")
        if os.path.exists(audio_path):
            audio = AudioFileClip(audio_path)
            audio = audio.with_effects([vfx.MultiplySpeed(NARRATION_SPEED)])
            audio_clips.append(audio.with_start(start))

    print("Compositing video...")
    bg_clip = ColorClip(size=(WIDTH, HEIGHT), color=hex_to_rgb(COLORS["bg"]), duration=total_duration)
    video = CompositeVideoClip([bg_clip] + clips, size=(WIDTH, HEIGHT))

    if audio_clips:
        combined_audio = CompositeAudioClip(audio_clips)
        video = video.with_audio(combined_audio)

    out_path = os.path.join(OUT_DIR, "safety-cover-video.mp4")
    print(f"Rendering to {out_path}...")
    video.write_videofile(
        out_path,
        fps=FPS,
        codec="libx264",
        audio_codec="aac",
        threads=4,
        preset="medium",
    )
    print(f"Done! Output: {out_path}")


if __name__ == "__main__":
    build_video()
