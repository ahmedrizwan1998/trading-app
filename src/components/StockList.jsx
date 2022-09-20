import {useState, useEffect} from "react";
import finnHub from "../apis/finnHub";
import {BsFillCaretDownFill, BsFillCaretUpFill} from "react-icons/bs";

function StockList() {
    const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);
    const [stock, setStock] = useState([]);

    const changeColor = (change) => {
        return change > 0 ?"success":"danger";
    };
    const renderIcon = (upDown) => {
        return upDown > 0 ?<BsFillCaretUpFill />:<BsFillCaretDownFill />
    };
    useEffect(() => {
        let isMounted = true;
// with Promise.all() it takes less time         
        const fetchData = async () => {
            try {
                const responses = await Promise.all(watchList.map((stock) => {
                    return finnHub.get("/quote" ,{
                        params: {
                            symbol: stock
                        }
                    })
                }))
                const data = responses.map((response) => {
                    return {
                        data: response.data,
                        symbol: response.config.params.symbol
                    }
                })
                if (isMounted) {
                    setStock(data);
                }
                console.log(data)
            } catch (error) {
                console.log(error);
            }
        }    
        fetchData();
        return () => {isMounted = false}
    }, [])
  return (
    <div>
        <table className="table hover mt-5">
            <thead style={{color: "rgb(79,89,102"}}>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Last</th>
                    <th scope="col">Chg</th>
                    <th scope="col">Chg%</th>
                    <th scope="col">High</th>
                    <th scope="col">Low</th>
                    <th scope="col">Open</th>
                    <th scope="col">Pclose</th>
                </tr>
            </thead>
            <tbody>
                {stock.map((stockData) => {
                    return (
                        <tr className="table-row" key={stockData.symbol}>
                            <th>{stockData.symbol}</th>
                            <td>{stockData.data.c}</td>
                            <td className={`text-${changeColor(stockData.data.d)}`}>{stockData.data.d} {renderIcon(stockData.data.d)}</td>    
                            <td className={`text-${changeColor(stockData.data.dp)}`}>{stockData.data.dp} {renderIcon(stockData.data.dp)}</td>    
                            <td>{stockData.data.h}</td>    
                            <td>{stockData.data.l}</td>    
                            <td>{stockData.data.o}</td>    
                            <td>{stockData.data.d}</td>    
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default StockList

// fetching is sequencial thats why it takes alot of time fetching

//         const response1 = await finnHub.get("/quote?", {
//             params: {
//                 symbol: "GOOGL"
//             }
//         })
//         responses.push(response1);
//         const response2 = await finnHub.get("/quote?", {
//             params: {
//                 symbol: "MSFT"
//             }
//         })
//         responses.push(response2);
//         const response3 = await finnHub.get("/quote?", {
//             params: {
//                 symbol: "AMZN"
//             }
//         })
//         responses.push(response3);
//         console.log(responses)
//         if (isMounted) {
//             setStock(responses)
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }    

// still we are hard coding the symbols    
            // const responses = Promise.all(finnHub.get("/quote?", {
            //     params: {
            //         symbol: "GOOGL"
            //     }
            // }), finnHub.get("/quote?", {
            //     params: {
            //         symbol: "MSFT"
            //     }
            // }), finnHub.get("/quote?", {
            //     params: {
            //         symbol: "AMZN"
            //     }
            // }))

