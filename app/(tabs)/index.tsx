import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import { View, Text, Animated } from 'react-native';
import { useEffect, useState } from 'react';
import { CartesianChart, Line, useChartPressState  } from "victory-native";
import CandleStickPage from '../../components/candlesticPage';



const candlestickWebSocketURL = 'wss://stream.binance.com:9443/ws/btcusdt@kline_1m';

const DATA = [
  { day: new Date("2024-04-09").getTime(), price: 61029},
  { day: new Date("2024-04-10").getTime(), price: 61020},
  { day: new Date("2024-04-11").getTime(), price: 61010},
  { day: new Date("2024-04-12").getTime(), price: 60959},
  { day: new Date("2024-04-13").getTime(), price: 61075},
  { day: new Date("2024-04-14").getTime(), price: 61044},
  { day: new Date("2024-04-15").getTime(), price: 61030},
]



export default function HomeScreen() {

  const { state, isActive } = useChartPressState({x: 0, y: { price: 0} })
  const [largura, setLargura] = useState(new Animated.Value(0));
  const [altura, setAltura] = useState(30);

  Animated.timing(
    largura, 
    {
      toValue:360,
      duration: 2000,
      useNativeDriver: false, 
    }).start();

  const [lineChartData, setLineChartData] = useState<{ x: number; y: number; }[]>([]);
  const [candlestickChartData, setCandlestickChartData] = useState<{
    date: Date;
    high: number;
    low: number;
    open: number;
    close: number;
  }[]>([]);
  
  
  
  useEffect(() => {
    const candlestickWs = new WebSocket(candlestickWebSocketURL);

    candlestickWs.onopen = () => {
      console.log('Conectado ao WebSocket de Candlestick');
    };

    candlestickWs.onmessage = (message) => {
      const candlestickData = JSON.parse(message.data.toString());
      const dateWithoutTime = new Date(new Date(candlestickData.k.t).setUTCHours(0, 0, 0, 0));
      const dateInMilliseconds = dateWithoutTime.getTime();

      const newDataPoint = {
        x: dateInMilliseconds,
        y: parseFloat(candlestickData.k.c)
      };

      const newCandleDataPoint = {
        date: dateWithoutTime,
        high: parseFloat(candlestickData.k.h),
        low: parseFloat(candlestickData.k.l),
        open: parseFloat(candlestickData.k.o),
        close: parseFloat(candlestickData.k.c)
      };

    
      console.log(newDataPoint)

      // Atualizar os dados do gráfico de velas com os dados recebidos
      setCandlestickChartData((prevData) => [...prevData, newCandleDataPoint]);
      // Atualizar os dados do gráfico de linha com os dados recebidos
      setLineChartData((prevData) => [...prevData, newDataPoint]);
    };

   

    return () => {
      candlestickWs.close();
    };
  }, []);

  // console.log(candlestickChartData)

  



  return (

<View style={{marginTop: 100}}>
  <Animated.View style={{
        width: largura,
        height: altura
      }}>
  <Text style={{ fontWeight: 'bold', marginLeft: 20, fontSize: 19, color: '#e44b8d'}}>Bem-Vindo(a) a CryptoPink!</Text>
  <Text style={{ fontSize: 15, marginLeft: 20}}>Dados da Binance atualizados em Tempo Real</Text>
<Text style={{ marginLeft: 20, fontWeight: 'bold', fontSize: 18, marginTop: 10}}>Gráfico em Linha</Text>
<View > 

<View style={{ width: '100%', height: 150}}>
{/* <Text style={{ position: 'absolute', top: 10, left: 10 }}>{textValue}</Text> */}
<CartesianChart data={lineChartData} xKey="x" yKeys={["y"]}
chartPressState={[]} >

        {({ points }) => (
          <Line points={points.y} color="pink" strokeWidth={4} />
        )}
      </CartesianChart>
</View>



<Text style={{ marginLeft: 20, fontWeight: 'bold', fontSize:18}}>Gráfico em Vela</Text>

<CandleStickPage candleData={candlestickChartData} />


</View>
</Animated.View>


</View>

  )
}