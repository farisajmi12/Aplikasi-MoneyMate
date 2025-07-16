// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        tips: {
          general: "Start tracking your income and expenses to see your financial patterns.",
          expense: "Your expenses are higher than your income. Consider budgeting more strictly.",
          income: "Your finances are balanced, keep up the good work!",
          food: "Spending a lot on food? Try cooking at home to save money.",
          transport: "Transportation costs are high. Consider using public transport or carpooling.",
          small_income: "Your income is still small. Think about earning more through side gigs.",
        }
      }
    },
    id: {
      translation: {
        tips: {
          general: "Mulailah mencatat pengeluaran dan pemasukan untuk melihat pola keuanganmu.",
          expense: "Pengeluaranmu lebih besar dari pemasukan. Pertimbangkan untuk membuat anggaran yang lebih ketat.",
          income: "Keuanganmu cukup seimbang, pertahankan pola ini!",
          food: "Pengeluaran besar di makanan? Coba masak sendiri di rumah untuk menghemat.",
          transport: "Transportasi cukup menguras kantong. Manfaatkan transportasi umum atau carpool.",
          small_income: "Pemasukan masih kecil? Pertimbangkan cari penghasilan tambahan seperti freelance.",
        }
      }
    }
  },
  lng: 'id', // Default language
  fallbackLng: 'id', // Language fallback
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
