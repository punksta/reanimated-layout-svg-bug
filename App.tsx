import {GestureHandlerRootView} from "react-native-gesture-handler";
import React, {useEffect, useState} from "react";
import Animated, {FadeInDown} from 'react-native-reanimated';
import {
    Chart,
    Line,
} from 'react-native-responsive-linechart'


const enableLayoutAnimation = true;

export default function App() {
    const [showAnimatedView, setShowAnimatedView] = useState(false);

    useEffect(() => {
        async function f() {
            for (let i = 0; i < 5; i++) {
                await new Promise(n => setTimeout(n, 200));
                setShowAnimatedView(false)
                await new Promise(n => setTimeout(n, 200));
                setShowAnimatedView(true)
            }
        }
        f();
    }, []);
  return (
      <GestureHandlerRootView style={{flex:1}}>
          <Graph/>
          {enableLayoutAnimation && showAnimatedView && <Animated.View
                                       entering={FadeInDown}
          >
          </Animated.View>}
      </GestureHandlerRootView>
  );
}


export const Graph: React.FC = () => {
    const allData = [
        {x: 1, y: 10 * Math.random()},
        {x: 2, y: 10 * Math.random()},
        {x: 3, y: 10  * Math.random()},
        {x: 4, y: 10 * Math.random()},
        {x: 5, y: 10 * Math.random()},
        {x: 6, y: 10 * Math.random()},
        {x: 7, y: 10 * Math.random()},
        {x: 8, y: 10 * Math.random()},
        {x: 9, y: 10 * Math.random()},
    ]

    const xMin =
        allData.length > 0
            ? Math.min(...allData.map(it => it.x))
            : 0
    const xMax =
        allData.length > 0
            ? Math.max(...allData.map(it => it.x))
            : 0



    return (
        <Chart
            // @ts-ignore
            disableTouch={false}
            disableGestures={false}
            style={{
                height: 400,
                width: '100%',
                backgroundColor: 'white',
                marginTop: 20
            }}
            viewport={{
                initialOrigin: {
                    x: 1,
                    y: 0
                },
                size: {
                    width: 3,
                    height: 10
                }
            }}
            xDomain={{
                min: xMin,
                max: xMax
            }}

            padding={{ left: 26, top: 10, bottom: 36, right: 10 }}
        >

            {allData.length > 0 && (
                <Line
                    data={allData}
                    smoothing='cubic-spline'
                    theme={{
                        stroke: { color: '#E8D3FE', width: 2 },
                        scatter: {
                            default: { width: 10, height: 10, rx: 5, color: 'red' }
                        }
                    }}
                />
            )}
        </Chart>
    )
}

