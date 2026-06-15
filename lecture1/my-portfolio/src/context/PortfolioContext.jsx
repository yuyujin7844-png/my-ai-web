import { createContext, useContext, useState, useMemo, useCallback } from 'react'

const PortfolioContext = createContext(null)

const INITIAL_DATA = {
  basicInfo: {
    name:       'YuJin',
    role:       '웹디자이너',
    experience: '신입',
    birthDate:  '1994.7.11',
    education:  '',
    major:      '',
    photo:      '',
    intro:      '사용자의 시선이 머무는 순간을 디자인합니다. 작은 디테일 하나 놓치지 않는 섬세함으로, 브랜드의 매력을 웹 공간에 온전히 담아내겠습니다.',
  },
  sections: [
    { id: 'design-story', title: '나의 디자인 스토리', content: '', showInHome: true  },
    { id: 'philosophy',   title: '디자인 철학',        content: '', showInHome: true  },
    { id: 'personal',     title: '개인적인 이야기',    content: '', showInHome: false },
  ],
  skills: [
    { id: 1, name: 'Figma',       level: 80, color: '#F24E1E', category: 'Design' },
    { id: 2, name: 'Photoshop',   level: 60, color: '#31A8FF', category: 'Adobe'  },
    { id: 3, name: 'Illustrator', level: 70, color: '#FF9A00', category: 'Adobe'  },
  ],
}

export function PortfolioProvider({ children }) {
  const [aboutMeData, setAboutMeData] = useState(INITIAL_DATA)
  const [lastModified, setLastModified] = useState(null)

  // ─── useCallback: 참조 안정화 ────────────────────────
  const updateSection = useCallback((id, content) => {
    setAboutMeData(prev => ({
      ...prev,
      sections: prev.sections.map(s => s.id === id ? { ...s, content } : s),
    }))
    setLastModified(Date.now())
  }, [])

  const updateSkillLevel = useCallback((id, level) => {
    setAboutMeData(prev => ({
      ...prev,
      skills: prev.skills.map(s => s.id === id ? { ...s, level } : s),
    }))
    setLastModified(Date.now())
  }, [])

  const updateBasicInfo = useCallback((field, value) => {
    setAboutMeData(prev => ({
      ...prev,
      basicInfo: { ...prev.basicInfo, [field]: value },
    }))
    setLastModified(Date.now())
  }, [])

  // ─── useMemo: aboutMeData 변경 시만 재계산 ──────────
  // getHomeData() 함수 대신 homeData 값으로 제공
  // → 렌더마다 새 객체 생성하지 않아 React.memo 정상 작동
  const homeData = useMemo(() => {
    const homeContent = aboutMeData.sections
      .filter(s => s.showInHome)
      .map(s => ({
        id:      s.id,
        title:   s.title,
        summary: s.content
          ? (s.content.length > 80 ? s.content.substring(0, 80) + '...' : s.content)
          : null,
      }))

    const topSkills = [...aboutMeData.skills]
      .sort((a, b) => b.level - a.level)
      .slice(0, 4)

    return {
      content:   homeContent,
      skills:    topSkills,
      basicInfo: aboutMeData.basicInfo,
    }
  }, [aboutMeData])

  const value = useMemo(() => ({
    aboutMeData,
    homeData,
    lastModified,
    updateSection,
    updateSkillLevel,
    updateBasicInfo,
  }), [aboutMeData, homeData, lastModified, updateSection, updateSkillLevel, updateBasicInfo])

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext)
  if (!ctx) throw new Error('usePortfolio는 PortfolioProvider 내부에서만 사용 가능합니다')
  return ctx
}
