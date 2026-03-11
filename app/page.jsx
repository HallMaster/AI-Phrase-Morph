'use client'

import { useState } from 'react'
import styles from './page.module.css'

const TRANSFORM_OPTIONS = [
  {
    id: 'haiku',
    label: 'Haiku',
    icon: '🌸',
    description: '5-7-5 syllables',
  },
  {
    id: 'shakespearean',
    label: 'Shakespearean',
    icon: '🎭',
    description: 'Ye olde English',
  },
  {
    id: 'rhyme',
    label: 'Rhyme',
    icon: '🎵',
    description: 'Poetic & rhythmic',
  },
  {
    id: 'headline',
    label: 'News Headline',
    icon: '📰',
    description: 'Breaking news style',
  },
  {
    id: 'eli5',
    label: "Like I'm Five",
    icon: '🧸',
    description: 'Simple & clear',
  },
]

export default function Home() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('haiku')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleTransform = async () => {
    if (!inputText.trim()) return

    setIsLoading(true)
    setError('')
    setOutputText('')

    try {
      const res = await fetch('/api/transform', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText, style: selectedStyle }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setOutputText(data.result)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setInputText('')
    setOutputText('')
    setError('')
  }

  const selectedOption = TRANSFORM_OPTIONS.find((o) => o.id === selectedStyle)

  return (
    <main className={styles.main}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>✦</span>
            <span className={styles.logoText}>Text Transformer</span>
          </div>
          <p className={styles.tagline}>Powered by Gemini AI</p>
        </div>
      </header>

      {/* Workspace */}
      <section className={styles.workspace}>

        {/* Left panel: style options + input */}
        <div className={styles.leftPanel}>

          {/* Style selector */}
          <div className={styles.stylePanel}>
            <p className={styles.styleLabel}>Transform Style</p>
            <div className={styles.styleOptions}>
              {TRANSFORM_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  className={`${styles.styleBtn} ${selectedStyle === option.id ? styles.styleBtnActive : ''}`}
                  onClick={() => setSelectedStyle(option.id)}
                >
                  <span className={styles.styleBtnIcon}>{option.icon}</span>
                  <div className={styles.styleBtnText}>
                    <span className={styles.styleBtnLabel}>{option.label}</span>
                    <span className={styles.styleBtnDesc}>{option.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Input box */}
          <div className={styles.textBoxWrapper}>
            <div className={styles.textBoxHeader}>
              <span className={styles.textBoxTitle}>Your Text</span>
              <span className={styles.charCount}>{inputText.length} chars</span>
            </div>
            <textarea
              className={styles.inputTextarea}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter your text here…"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Center: action buttons */}
        <div className={styles.centerPanel}>
          <button
            className={styles.transformBtn}
            onClick={handleTransform}
            disabled={isLoading || !inputText.trim()}
          >
            {isLoading ? (
              <span className={styles.spinner} />
            ) : (
              <span className={styles.transformArrow}>→</span>
            )}
            <span className={styles.transformBtnLabel}>
              {isLoading ? 'Transforming' : 'Transform'}
            </span>
          </button>

          <button
            className={styles.clearBtn}
            onClick={handleClear}
            disabled={isLoading}
          >
            Clear
          </button>
        </div>

        {/* Right panel: output */}
        <div className={styles.rightPanel}>
          <div className={styles.textBoxWrapper}>
            <div className={styles.textBoxHeader}>
              <span className={styles.textBoxTitle}>
                {selectedOption?.icon} {selectedOption?.label}
              </span>
              {outputText && (
                <span className={styles.generatedBadge}>Generated</span>
              )}
            </div>
            <div
              className={`${styles.outputBox} ${isLoading ? styles.outputLoading : ''} ${!outputText && !isLoading ? styles.outputEmpty : ''}`}
            >
              {isLoading ? (
                <div className={styles.loadingDots}>
                  <span /><span /><span />
                </div>
              ) : error ? (
                <p className={styles.errorText}>{error}</p>
              ) : outputText ? (
                <p className={styles.outputText}>{outputText}</p>
              ) : (
                <p className={styles.placeholderText}>
                  Your transformed text will appear here…
                </p>
              )}
            </div>
          </div>
        </div>

      </section>
    </main>
  )
}
