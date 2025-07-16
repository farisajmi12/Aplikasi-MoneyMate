import { IonContent } from '@ionic/react';
import { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TransactionContext } from '../context/TransactionContext'; // ⬅️ Import context
import './Analytics.css';

const Analytics: React.FC = () => {
  const { transactions } = useContext(TransactionContext); // ⬅️ Ambil dari context

  // Aggregate data untuk grafik (contoh: total tiap kategori)
  const chartData = transactions.reduce((acc: any, item) => {
    let existing = acc.find((d: any) => d.category === item.category);
    if (!existing) {
      existing = { category: item.category, income: 0, expense: 0 };
      acc.push(existing);
    }
    if (item.type === 'income') {
      existing.income += item.amount;
    } else {
      existing.expense += item.amount;
    }
    return acc;
  }, []);
  
  

  return (
    <IonContent className="analytics-container">
  <h2 className="analytics-title">Analisis Transaksi</h2>

  {transactions.length === 0 ? (
    <p className="no-data">Belum ada transaksi.</p>
  ) : (
    <div className="chart-wrapper">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="income" fill="#4caf50" name="Pemasukan" radius={[10, 10, 0, 0]} />
          <Bar dataKey="expense" fill="#f44336" name="Pengeluaran" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )}
</IonContent>
  );
};

export default Analytics;
