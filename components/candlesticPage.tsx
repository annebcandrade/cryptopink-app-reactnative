import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Line, Rect } from 'react-native-svg';

interface CandleStickPageProps {
  candleData: { date: Date; high: number; low: number; open: number; close: number }[];
}

const CandleStickPage: React.FC<CandleStickPageProps> = ({ candleData }) => {
  const candleWidth = 10; // Largura de cada vela
  const chartWidth = candleData.length * (candleWidth + 5); // Largura total do gráfico

  const maxPrice = Math.max(...candleData.map(candle => candle.high)); // Preço máximo
  const minPrice = Math.min(...candleData.map(candle => candle.low)); // Preço mínimo

  const candlesticks = candleData.map((candle, index) => {
    const x = index * (candleWidth + 5); // Posição X da vela
    const candleHeight = Math.abs(candle.open - candle.close); // Altura da vela
    const y = Math.min(candle.open, candle.close); // Posição Y da vela

    return (
      <View key={index}>
        <Rect
          x={x}
          y={(1 - (candle.high - minPrice) / (maxPrice - minPrice)) * 300} // Posição Y da vela alta
          width={candleWidth}
          height={(candle.high - candle.low) / (maxPrice - minPrice) * 300} // Altura da vela alta
          fill={candle.open > candle.close ? 'pink' : 'black'} // Cor da vela alta
        />
        <Line
          x1={x + candleWidth / 2}
          y1={(1 - (candle.high - minPrice) / (maxPrice - minPrice)) * 300}
          x2={x + candleWidth / 2}
          y2={(1 - (candle.low - minPrice) / (maxPrice - minPrice)) * 300}
          stroke="grey"
          strokeWidth="1"
        />
        <Rect
          x={x + 1}
          y={(1 - (y - minPrice) / (maxPrice - minPrice)) * 300} // Posição Y da vela baixa
          width={candleWidth - 2}
          height={candleHeight / (maxPrice - minPrice) * 300} // Altura da vela baixa
          fill={candle.open > candle.close ? 'pink' : 'black'} // Cor da vela baixa
        />
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <Svg width={chartWidth} height={300}>
        {candlesticks}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CandleStickPage;
