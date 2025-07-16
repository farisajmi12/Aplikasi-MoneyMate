import { IonContent, IonButton } from '@ionic/react';
import { useContext, useState } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import './Wallet.css';

const Wallet: React.FC = () => {
  const { transactions } = useContext(TransactionContext);
  const [savedMoney, setSavedMoney] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const totalIncome = transactions
    .filter(tx => tx.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter(tx => tx.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const saldo = totalIncome - totalExpense - savedMoney;

  const saveSomeMoney = () => {
    if (saldo >= 10000) {
      setSavedMoney(prev => prev + 10000);
      setError(null);
    } else {
      setError('Saldo belum cukup. Minimal Rp10.000 untuk menabung.');
    }
  };

  const withdrawMoney = () => {
    if (savedMoney >= 10000) {
      setSavedMoney(prev => prev - 10000);
      setError(null);
    } else {
      setError('Tabungan belum cukup. Minimal Rp10.000 untuk ditarik.');
    }
  };

  return (
    <IonContent className="wallet-content">
      <div className="wallet-box">
        <h2>Dompet & Tabungan</h2>
        <p><strong>Saldo Aktif:</strong><br />
          {saldo.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
          })}
        </p>
        <p><strong>Tabungan:</strong><br />
          {savedMoney.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
          })}
        </p>

        {error && <p className="wallet-error">{error}</p>}

        <IonButton
          expand="block"
          color="success"
          onClick={saveSomeMoney}
          disabled={saldo < 10000}
        >
          Simpan Rp10.000 ke Tabungan
        </IonButton>

        <IonButton
          expand="block"
          color="warning"
          onClick={withdrawMoney}
          disabled={savedMoney < 10000}
        >
          Tarik Rp10.000 dari Tabungan
        </IonButton>
      </div>
    </IonContent>
  );
};

export default Wallet;
