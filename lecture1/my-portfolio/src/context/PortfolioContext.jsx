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
    {
      id: 'design-story',
      title: '나의 디자인 스토리',
      showInHome: true,
      content:
        '디자인과의 첫 만남은 우연이었지만, 지금은 제 일상의 중심이 되었습니다. ' +
        '처음엔 Photoshop으로 이미지를 다듬는 소소한 작업에서 시작했고, ' +
        'Figma를 배우면서 UI 설계의 진짜 재미를 발견했습니다. ' +
        '사용자의 눈길이 자연스럽게 흘러가는 레이아웃, 브랜드의 개성이 묻어나는 색상 조합을 고민하는 시간이 즐겁습니다. ' +
        'GTQ · GTQi · ACP 자격증을 취득하며 기초를 탄탄히 다졌고, ' +
        '이제 실무에서 그 배움을 직접 증명하고 싶습니다.',
    },
    {
      id: 'philosophy',
      title: '디자인 철학',
      showInHome: true,
      content:
        '\'사용자가 편해야 비로소 좋은 디자인이다\' — 이것이 저의 핵심 철학입니다. ' +
        '화려함보다는 직관성을, 유행보다는 목적에 맞는 설계를 우선합니다. ' +
        '클라이언트와 충분히 소통하여 브랜드의 본질을 파악하고, ' +
        '그 이야기를 시각 언어로 정확히 전달하는 것이 웹디자이너의 역할이라 생각합니다. ' +
        '작은 버튼 하나, 여백 하나에도 이유가 있는 디자인을 만들겠습니다.',
    },
    {
      id: 'personal',
      title: '개인적인 이야기',
      showInHome: false,
      content:
        '사람과 이야기하는 것을 정말 좋아합니다. ' +
        '그래서인지 소통을 바탕으로 한 디자인 작업에서 더 큰 보람을 느끼는 것 같아요. ' +
        '카페에서 노트에 레이아웃을 스케치하거나, ' +
        '좋아하는 브랜드 웹사이트를 뜯어보며 \'왜 이렇게 배치했을까?\' 혼자 분석하는 것이 취미입니다. ' +
        '언젠가 제 손으로 만든 디자인이 누군가의 기억에 남는 경험이 되길 바랍니다.',
    },
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
