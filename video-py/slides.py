"""Slide definitions matching the existing Remotion video."""

import os

IMAGES_DIR = os.path.join(os.path.dirname(__file__), "..", "video", "public", "images")

FPS = 30
WIDTH = 1920
HEIGHT = 1080

COLORS = {
    "bg": "#0d2240",
    "bg_end": "#1a4a8a",
    "accent": "#e8650a",
    "gold": "#f0a040",
    "white": "#ffffff",
}

AUDIO_PADDING = 1.0
ENDCARD_DURATION = 6

SLIDES = [
    # Act 1: Problem (dark tone)
    {
        "id": 1, "type": "image",
        "image": "d1_safety.jpg",
        "narration": "コンベアのつなぎ目、カバーなしで稼働していませんか？",
        "zoom": "in", "tone": "dark",
    },
    {
        "id": 2, "type": "image",
        "image": "d2_safety.jpg",
        "narration": "部品が手に入らない。メーカーにも対応を断られた。",
        "zoom": "in", "tone": "dark",
    },
    {
        "id": 3, "type": "image",
        "image": "d3_safety.jpg",
        "narration": "注意書きを貼っても、現場では読まれません。",
        "zoom": "out", "tone": "dark",
    },
    {
        "id": 4, "type": "image",
        "image": "d4_safety.jpg",
        "narration": "製造業の死亡災害。最多は挟まれ・巻き込まれです。",
        "subtitle": "製造業の死亡災害 最多＝挟まれ・巻き込まれ 32.6%",
        "zoom": "in", "tone": "dark",
    },
    # Bridge
    {
        "id": 5, "type": "bridge",
        "narration": "その課題、岩代工業の設備カバーで解決できます。",
    },
    # Act 2A: Conveyor junction
    {
        "id": 6, "type": "image",
        "image": "d7_safety.jpg",
        "narration": "メーカー不問。現場での採寸から対応いたします。",
        "zoom": "out", "tone": "light",
    },
    {
        "id": 7, "type": "image",
        "image": "d10a_safecover.jpg",
        "narration": "設計から製作、取付まで一貫して対応します。",
        "zoom": "in", "tone": "light",
    },
    # Act 2B: Retrofit
    {
        "id": 8, "type": "image",
        "image": "d5a_safecover.jpg",
        "narration": "設備の入替えは不要。後付けカバーでコスト削減。",
        "zoom": "out", "tone": "light",
    },
    {
        "id": 9, "type": "image",
        "image": "d11a_safecover.jpg",
        "narration": "カバー交換で、安全基準も最新レベルに更新。",
        "zoom": "in", "tone": "light",
    },
    # Act 2C: Poka-yoke
    {
        "id": 10, "type": "image",
        "image": "d6_safety.jpg",
        "narration": "多国籍の現場でも、物理カバーなら全員を守れます。",
        "zoom": "out", "tone": "light",
    },
    {
        "id": 11, "type": "image",
        "image": "d9_safecover.jpg",
        "narration": "深夜でも、物理カバーは24時間守り続けます。",
        "zoom": "in", "tone": "light",
    },
    {
        "id": 12, "type": "image",
        "image": "d12_safecover.jpg",
        "narration": "透明素材なら、安全性と視認性を両立できます。",
        "zoom": "out", "tone": "light",
    },
    # Act 3: Differentiation
    {
        "id": 13, "type": "image",
        "image": "d13_safecover.jpg",
        "narration": "既製品では合わない。オーダーメイドでぴったり。",
        "zoom": "in", "tone": "light",
    },
    # Act 4: CTA
    {
        "id": 14, "type": "image",
        "image": "d14_safecover.jpg",
        "narration": "ご相談は無料です。お気軽にお問い合わせください。",
        "zoom": "out", "tone": "light",
    },
    # End card (no narration)
    {
        "id": 15, "type": "endcard",
        "narration": None,
    },
]
