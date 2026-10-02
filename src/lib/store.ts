import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { HskLevel, SrsCard, TutorTurn } from "./types";
import { isDue, newCard, review } from "./srs";

function todayKey(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function yesterdayKey(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return todayKey(d);
}

export type AppState = {
  hydrated: boolean;
  xp: number;
  dailyXp: number;
  dailyGoal: number;
  streak: number;
  lastStudyDate: string | null;
  completedLessons: string[];
  currentLessonId: string;
  placementBand: HskLevel | null;
  srs: Record<string, SrsCard>;
  knownVocab: string[];
  toneCorrect: number;
  toneTotal: number;
  writeCorrect: number;
  writeTotal: number;
  listenCorrect: number;
  listenTotal: number;
  tutorHistory: TutorTurn[];
  rate: number;
  showPinyin: boolean;
  markHydrated: () => void;
  addXp: (amount: number) => void;
  completeLesson: (id: string, nextId?: string) => void;
  setCurrentLesson: (id: string) => void;
  setPlacement: (band: HskLevel) => void;
  reviewVocab: (id: string, quality: number) => void;
  markKnown: (id: string) => void;
  recordTone: (ok: boolean) => void;
  recordWrite: (ok: boolean) => void;
  recordListen: (ok: boolean) => void;
  setDailyGoal: (n: number) => void;
  setRate: (n: number) => void;
  togglePinyin: () => void;
  pushTutor: (turn: TutorTurn) => void;
  clearTutor: () => void;
  unlockUpTo: (ids: string[], current: string) => void;
  dueIds: () => string[];
};

const emptyStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      hydrated: false,
      xp: 0,
      dailyXp: 0,
      dailyGoal: 50,
      streak: 0,
      lastStudyDate: null,
      completedLessons: [],
      currentLessonId: "sounds-tones",
      placementBand: null,
      srs: {},
      knownVocab: [],
      toneCorrect: 0,
      toneTotal: 0,
      writeCorrect: 0,
      writeTotal: 0,
      listenCorrect: 0,
      listenTotal: 0,
      tutorHistory: [],
      rate: 0.88,
      showPinyin: true,
      markHydrated: () => set({ hydrated: true }),
      addXp: (amount) => {
        const today = todayKey();
        const { lastStudyDate, streak, dailyXp, xp } = get();
        let nextStreak = streak;
        let nextDaily = dailyXp;
        if (lastStudyDate === today) {
          nextDaily += amount;
        } else if (lastStudyDate === yesterdayKey()) {
          nextStreak = streak + 1;
          nextDaily = amount;
        } else {
          nextStreak = 1;
          nextDaily = amount;
        }
        set({
          xp: xp + amount,
          dailyXp: nextDaily,
          streak: nextStreak,
          lastStudyDate: today,
        });
      },
      completeLesson: (id, nextId) => {
        const { completedLessons, addXp } = get();
        if (!completedLessons.includes(id)) {
          set({
            completedLessons: [...completedLessons, id],
            currentLessonId: nextId ?? id,
          });
          addXp(40);
        } else if (nextId) {
          set({ currentLessonId: nextId });
        }
      },
      setCurrentLesson: (id) => set({ currentLessonId: id }),
      setPlacement: (band) => set({ placementBand: band }),
      reviewVocab: (id, quality) => {
        const srs = { ...get().srs };
        srs[id] = review(srs[id] ?? newCard(), quality);
        set({ srs });
        if (quality >= 4 && !get().knownVocab.includes(id)) {
          set({ knownVocab: [...get().knownVocab, id] });
        }
      },
      markKnown: (id) => {
        const srs = { ...get().srs };
        srs[id] = review(srs[id] ?? newCard(), 5);
        const known = get().knownVocab.includes(id) ? get().knownVocab : [...get().knownVocab, id];
        set({ srs, knownVocab: known });
      },
      recordTone: (ok) =>
        set({
          toneTotal: get().toneTotal + 1,
          toneCorrect: get().toneCorrect + (ok ? 1 : 0),
        }),
      recordWrite: (ok) =>
        set({
          writeTotal: get().writeTotal + 1,
          writeCorrect: get().writeCorrect + (ok ? 1 : 0),
        }),
      recordListen: (ok) =>
        set({
          listenTotal: get().listenTotal + 1,
          listenCorrect: get().listenCorrect + (ok ? 1 : 0),
        }),
      setDailyGoal: (n) => set({ dailyGoal: n }),
      setRate: (n) => set({ rate: n }),
      togglePinyin: () => set({ showPinyin: !get().showPinyin }),
      pushTutor: (turn) =>
        set({ tutorHistory: [...get().tutorHistory, turn].slice(-40) }),
      clearTutor: () => set({ tutorHistory: [] }),
      unlockUpTo: (ids, current) => {
        const merged = new Set([...get().completedLessons, ...ids]);
        set({ completedLessons: [...merged], currentLessonId: current });
      },
      dueIds: () => {
        const { srs } = get();
        return Object.entries(srs)
          .filter(([, card]) => isDue(card))
          .map(([id]) => id);
      },
    }),
    {
      name: "cinnabar-progress",
      storage: createJSONStorage(() =>
        typeof window === "undefined" ? emptyStorage : localStorage,
      ),
      skipHydration: true,
      partialize: (s) => ({
        xp: s.xp,
        dailyXp: s.dailyXp,
        dailyGoal: s.dailyGoal,
        streak: s.streak,
        lastStudyDate: s.lastStudyDate,
        completedLessons: s.completedLessons,
        currentLessonId: s.currentLessonId,
        placementBand: s.placementBand,
        srs: s.srs,
        knownVocab: s.knownVocab,
        toneCorrect: s.toneCorrect,
        toneTotal: s.toneTotal,
        writeCorrect: s.writeCorrect,
        writeTotal: s.writeTotal,
        listenCorrect: s.listenCorrect,
        listenTotal: s.listenTotal,
        tutorHistory: s.tutorHistory,
        rate: s.rate,
        showPinyin: s.showPinyin,
      }),
    },
  ),
);
