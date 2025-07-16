import {
  IonContent,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonIcon
} from '@ionic/react';
import { useState, useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import './Transactions.css';
import {
  restaurantOutline,
  carSportOutline,
  musicalNotesOutline,
} from 'ionicons/icons';

const Transactions: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const { transactions, addTransaction } = useContext(TransactionContext);

  const saveTransaction = (type: 'income' | 'expense') => {
    const parsed = parseInt(amount);
    if (!amount || isNaN(parsed)) {
      console.log('Jumlah tidak valid');
      return;
    }

    const newTransaction = {
      id: Date.now(),
      amount: parsed,
      type,
      category,
      date: new Date().toISOString()
    };

    addTransaction(newTransaction);

    // Reset input
    setAmount('');
    setCategory('');
  };

  const totalIncome = transactions
    .filter(tx => tx.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter(tx => tx.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const saldo = totalIncome - totalExpense;

  return (
    <IonContent className="ion-padding">
      {/* ✅ Saldo Visual */}
      <div className="saldo-box">
        <h2>Saldo Kamu</h2>
        <p>
          {new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          }).format(saldo)}
        </p>
      </div>

      {/* ✅ Input & Kategori */}
      <IonItem className="transactions-input">
        <IonInput
          type="tel"
          inputmode="numeric"
          placeholder="Jumlah (contoh: 10000)"
          value={amount}
          onIonChange={(e) => {
            const val = e.detail.value!;
            setAmount(val.replace(/[^0-9]/g, '')); // hanya angka
          }}
        />
      </IonItem>

      <IonItem className="transactions-select">
        <IonSelect
          placeholder="Kategori"
          value={category}
          onIonChange={e => setCategory(e.detail.value)}
        >
          <IonSelectOption value="makanan">Makanan</IonSelectOption>
          <IonSelectOption value="transport">Transportasi</IonSelectOption>
          <IonSelectOption value="hiburan">Hiburan</IonSelectOption>
        </IonSelect>
      </IonItem>

      {/* ✅ Tombol aksi */}
      <IonButton
        expand="block"
        color="success"
        onClick={() => saveTransaction('income')}
        className="transactions-button"
      >
        Tambah Pemasukan
      </IonButton>
      <IonButton
        expand="block"
        color="danger"
        onClick={() => saveTransaction('expense')}
        className="transactions-button"
      >
        Tambah Pengeluaran
      </IonButton>

      {/* ✅ Histori */}
      {transactions.length > 0 && (
        <div className="transactions-history">
          <h3>Histori Transaksi</h3>
          {transactions.map(tx => (
            <div className="transaction-item" key={tx.id}>
              <div className="transaction-category">
                {tx.category === 'makanan' && <IonIcon icon={restaurantOutline} />}
                {tx.category === 'transport' && <IonIcon icon={carSportOutline} />}
                {tx.category === 'hiburan' && <IonIcon icon={musicalNotesOutline} />}
                <span>{tx.category}</span>
              </div>
              <div className={`transaction-amount ${tx.type}`}>
                {tx.type === 'income' ? '+' : '-'}{' '}
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  minimumFractionDigits: 0,
                }).format(tx.amount)}
              </div>
            </div>
          ))}

          <div className="transactions-summary">
            <p>
              Total Pemasukan:{' '}
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
              }).format(totalIncome)}
            </p>
            <p>
              Total Pengeluaran:{' '}
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
              }).format(totalExpense)}
            </p>
          </div>
        </div>
      )}
    </IonContent>
  );
};

export default Transactions;
