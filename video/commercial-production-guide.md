# Remotionなしで商用利用可能な動画を制作する方法

Remotionはプロトタイピングに最適ですが、商用利用時はライセンス（企業利用は有償）が必要です。
以下に、Remotionなしで同等の動画を制作する方法をまとめます。

---

## 方法1: FFmpeg + TTS（完全無料・自動化向き）

### 概要
画像スライドショー＋テロップ＋音声をすべてCLIで自動生成。

### 手順

#### Step 1: ナレーション音声を生成（TTS）
**選択肢A: VOICEVOX（完全無料・商用利用OK）**
- 日本語の高品質なTTS。ずんだもん等のキャラクター音声。
- クレジット表記が必要（「VOICEVOX:ずんだもん」等）
- https://voicevox.hiroshiba.jp/

**選択肢B: Google Cloud Text-to-Speech**
- 自然な日本語音声（Wavenet/Neural2）
- 月100万文字まで無料枠あり
- 商用利用OK

**選択肢C: Amazon Polly**
- Takumi（男性）/ Mizuki（女性）の日本語音声
- 従量課金だがこの分量なら数円程度
- 商用利用OK

**選択肢D: プロナレーター**
- ココナラ・ランサーズ等で依頼（3,000〜10,000円程度）
- 最も自然で品質が高い

#### Step 2: FFmpegで動画を組み立て

```bash
# 各スライドを個別動画に変換（Ken Burns効果付き）
ffmpeg -loop 1 -i d1_safety.jpg -vf "
  zoompan=z='min(zoom+0.0015,1.15)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=150:s=1920x1080,
  drawtext=text='コンベアのつなぎ目、カバーなしで稼働していませんか？':
    fontfile=/path/to/NotoSansJP-Bold.otf:fontsize=46:fontcolor=white:
    x=(w-text_w)/2:y=h-120:enable='between(t,0.3,4.5)'
" -t 5 -c:v libx264 -pix_fmt yuv420p slide01.mp4

# すべてのスライドを結合
ffmpeg -f concat -i slides.txt -c copy output_video.mp4

# 音声をミックス
ffmpeg -i output_video.mp4 -i narration.wav -i bgm.mp3 \
  -filter_complex "[1:a]volume=1.0[narr];[2:a]volume=0.15[bgm];[narr][bgm]amix=inputs=2" \
  -c:v copy final.mp4
```

#### Step 3: BGMを追加
**フリーBGM素材（商用利用OK）**
- DOVA-SYNDROME: https://dova-s.jp/
- 甘茶の音楽工房: https://amachamusic.chagasi.com/
- Pixabay Music: https://pixabay.com/music/

---

## 方法2: CanvaPro（月1,500円・GUI操作）

### メリット
- ドラッグ&ドロップで直感的に編集
- 日本語テロップ対応
- Ken Burnsエフェクト（アニメーション機能）内蔵
- 商用利用OK（Pro素材含む）
- MP4書き出し対応

### 手順
1. 「動画」→「16:9」テンプレートを選択
2. 14枚の画像をページとして追加
3. 各ページにテキスト（ナレーション文）を配置
4. アニメーション「ズーム」を各ページに適用
5. 別途録音したナレーション音声をアップロードしてタイムラインに配置
6. BGMを追加（Canva内蔵の無料BGM or 外部素材）
7. MP4でダウンロード

---

## 方法3: CapCut（無料・スマホ/PC両対応）

### メリット
- 完全無料で高機能
- AI音声読み上げ（日本語対応）内蔵
- 自動字幕生成機能
- Ken Burns + トランジション + テロップが簡単

### 注意点
- 商用利用は利用規約を要確認（2024年時点で商用OK）
- ByteDance社のサービスなので企業ポリシー次第

### 手順
1. PC版CapCut（capcut.com）でプロジェクト作成
2. 画像を順番にタイムラインに配置
3. 各クリップの長さを調整（原稿の秒数に合わせる）
4. テロップを追加
5. 「テキスト読み上げ」でAIナレーション自動生成
6. BGMを追加
7. エクスポート

---

## 方法4: Python + moviepy（無料・自動化向き）

### メリット
- 完全OSSで商用利用に制約なし
- コードベースでバージョン管理・再生成が容易
- Remotionと同様の自動化が可能

```python
from moviepy.editor import (
    ImageClip, TextClip, CompositeVideoClip,
    concatenate_videoclips, AudioFileClip
)

slides = [
    {"image": "d1_safety.jpg", "text": "コンベアのつなぎ目、カバーなしで\n稼働していませんか？", "duration": 5},
    {"image": "d2_safety.jpg", "text": "部品がない。メーカーに断られた。", "duration": 3.5},
    # ... 残りのスライド
]

clips = []
for s in slides:
    img = ImageClip(s["image"]).set_duration(s["duration"])
    img = img.resize((1920, 1080))
    # Ken Burns: ゆっくりズームイン
    img = img.resize(lambda t: 1 + 0.03 * t)
    txt = TextClip(
        s["text"], fontsize=46, color="white",
        font="Noto-Sans-CJK-JP-Bold", stroke_color="black", stroke_width=2
    ).set_position(("center", 880)).set_duration(s["duration"])
    clip = CompositeVideoClip([img, txt])
    clips.append(clip)

video = concatenate_videoclips(clips)
narration = AudioFileClip("narration.wav")
bgm = AudioFileClip("bgm.mp3").volumex(0.15)
video = video.set_audio(CompositeAudioClip([narration, bgm]))
video.write_videofile("safety-cover-pr.mp4", fps=30)
```

---

## 推奨パターン

| 優先度 | 方法 | 適性 |
|--------|------|------|
| 1位 | **CanvaPro** | 最も手軽。GUI操作で微調整しやすい。ナレーション音声は外部生成して取り込み |
| 2位 | **CapCut** | 無料でAIナレーション内蔵。テロップ自動生成も便利 |
| 3位 | **Python + moviepy** | 自動化・量産向き。コードで管理できるのでRemotionの代替として最適 |
| 4位 | **FFmpeg** | 最も軽量だがテロップの日本語フォント設定が手間 |

---

## ナレーション音声の推奨ワークフロー

1. `narration-script.md` の原稿をセクションごとに分割
2. VOICEVOX or Google Cloud TTS でセクション単位で音声生成
3. Audacity（無料）で無音調整・つなぎ合わせ
4. 動画編集ツールに取り込んでタイミング調整
