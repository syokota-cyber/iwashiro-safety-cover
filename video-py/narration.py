"""Generate TTS narration audio for each slide using gTTS with pitch adjustment."""

import os
from gtts import gTTS
from pydub import AudioSegment
from slides import SLIDES

AUDIO_DIR = os.path.join(os.path.dirname(__file__), "audio")

PITCH_FACTOR = 0.88


def get_audio_duration(slide_id):
    path = os.path.join(AUDIO_DIR, f"slide_{slide_id:02d}.mp3")
    if not os.path.exists(path):
        return 0
    audio = AudioSegment.from_mp3(path)
    return len(audio) / 1000.0


def lower_pitch(audio, factor):
    """Lower pitch without changing speed by resampling."""
    original_rate = audio.frame_rate
    lowered = audio._spawn(
        audio.raw_data,
        overrides={"frame_rate": int(original_rate * factor)},
    )
    return lowered.set_frame_rate(original_rate)


def generate_narration(force=False):
    os.makedirs(AUDIO_DIR, exist_ok=True)

    for slide in SLIDES:
        text = slide.get("narration")
        if not text:
            continue

        sid = slide["id"]
        out_path = os.path.join(AUDIO_DIR, f"slide_{sid:02d}.mp3")

        if os.path.exists(out_path) and not force:
            dur = get_audio_duration(sid)
            print(f"  skip slide {sid} (cached, {dur:.1f}s)")
            continue

        print(f"  generating slide {sid}: {text}")
        tts = gTTS(text=text, lang="ja", slow=False)
        tmp_path = out_path + ".tmp"
        tts.save(tmp_path)

        audio = AudioSegment.from_mp3(tmp_path)
        audio = lower_pitch(audio, PITCH_FACTOR)
        audio.export(out_path, format="mp3")
        os.remove(tmp_path)

        dur = get_audio_duration(sid)
        print(f"  saved slide {sid}: {dur:.1f}s (pitch: {PITCH_FACTOR})")

    print("\nSummary:")
    durations = []
    for slide in SLIDES:
        if not slide.get("narration"):
            continue
        sid = slide["id"]
        dur = get_audio_duration(sid)
        durations.append(dur)
        print(f"  slide {sid}: {dur:.1f}s  ({len(slide['narration'])} chars)")

    if durations:
        avg = sum(durations) / len(durations)
        print(f"\n  avg: {avg:.1f}s, min: {min(durations):.1f}s, max: {max(durations):.1f}s")
        print(f"  total narration: {sum(durations):.1f}s")
        print(f"  pitch factor: {PITCH_FACTOR} (lower = deeper voice)")


if __name__ == "__main__":
    generate_narration(force=True)
