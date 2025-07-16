import { IonContent, IonIcon } from '@ionic/react';
import {
  walletOutline,
  trendingUpOutline,
  restaurantOutline,
  carSportOutline,
  happyOutline,
  warningOutline,
  checkmarkCircleOutline
} from 'ionicons/icons';
import { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { useTranslation } from 'react-i18next';
import './SavingsTips.css';

const SavingsTips: React.FC = () => {
  const { transactions } = useContext(TransactionContext);
  const { t } = useTranslation();

  const totalIncome = transactions
    .filter(tx => tx.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter(tx => tx.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const saldo = totalIncome - totalExpense;

  const categoryCount: { [key: string]: number } = {};
  transactions.forEach(tx => {
    categoryCount[tx.category] = (categoryCount[tx.category] || 0) + 1;
  });

  const tips = [];

  if (saldo <= 0 && transactions.length > 0) {
    tips.push(
      <div className="tip-box tip-critical" key="critical">
        <IonIcon icon={warningOutline} />
        Uangmu sudah habis! Saatnya hemat total atau segera cari pemasukan tambahan 🚨.
      </div>
    );
  }

  // ✅ Tambahan: saldo sudah balik positif
  if (saldo > 0 && totalExpense > 0) {
    tips.push(
      <div className="tip-box tip-balance-ok" key="balance-ok">
        <IonIcon icon={checkmarkCircleOutline} />
        🎉 Mantap! Kamu sudah kembali punya saldo. Jaga terus pengeluaran ya.
      </div>
    );
  }

  if (totalExpense > totalIncome) {
    tips.push(
      <div className="tip-box tip-expense" key="expense">
        <IonIcon icon={walletOutline} />
        {t('tips.expense')}
      </div>
    );
  } else {
    tips.push(
      <div className="tip-box tip-income" key="income">
        <IonIcon icon={trendingUpOutline} />
        {t('tips.income')}
      </div>
    );
  }

  if (categoryCount['makanan'] && categoryCount['makanan'] > 0) {
    tips.push(
      <div className="tip-box tip-food" key="food">
        <IonIcon icon={restaurantOutline} />
        {t('tips.food')}
      </div>
    );
  }

  if (categoryCount['transport'] && categoryCount['transport'] > 0) {
    tips.push(
      <div className="tip-box tip-transport" key="transport">
        <IonIcon icon={carSportOutline} />
        {t('tips.transport')}
      </div>
    );
  }

  if (tips.length === 0) {
    tips.push(
      <div className="tip-box tip-neutral" key="neutral">
        <IonIcon icon={happyOutline} />
        Keuanganmu cukup seimbang, pertahankan pola ini!
      </div>
    );
  }

  return (
    <IonContent className="ion-padding">
      <h2>Tips Menabung</h2>
      <p>Dapatkan tips hemat dan cara mengelola keuangan lebih baik di sini.</p>

      <div className="tips-container">{tips}</div>
    </IonContent>
  );
};

export default SavingsTips;
