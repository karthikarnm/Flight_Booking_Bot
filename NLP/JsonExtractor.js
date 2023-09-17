// // const fs = require('fs');

// // const JSONExtractor = () => {
// //     return new Promise((resolve, reject) => {
// //         fs.readFile('flights.json', 'utf-8', (err, data) => {
// //             if (err) {
// //                 console.error('Error reading file:', err);
// //                 reject(err); // Reject the promise if there's an error
// //                 return;
// //             }

// //             try {
// //                 const jsonData = JSON.parse(data);

// //                 // Ensure jsonData is an array before attempting to iterate
// //                 if (Array.isArray(jsonData)) {
// //                     const sourceArray = [];
// //                     const sourceArray1 = [];
// //                     const sourceArray2 = [];
// //                     for (const det of jsonData) {
// //                         if (det.reservationFor) {
// //                             sourceArray.push(det.reservationFor);
// //                         }
// //                     }
                    
// //                     resolve(sourceArray); // Resolve the promise with the extracted data
// //                 } else {
// //                     console.error('JSON data is not an array.');
// //                     reject('JSON data is not an array.'); // Reject if data format is not as expected
// //                 }
// //             } catch (parseError) {
// //                 console.error('Error parsing JSON:', parseError);
// //                 reject(parseError); // Reject if there's a JSON parsing error
// //             }
// //         });
// //     });
// // }

// // const JSONdestExtractor = () => {
// //     return new Promise((resolve, reject) => {
// //         fs.readFile('flights.json', 'utf-8', (err, data) => {
// //             if (err) {
// //                 console.error('Error reading file:', err);
// //                 reject(err);
// //                 return;
// //             }

// //             try {
// //                 const jsonData = JSON.parse(data);

// //                 if (Array.isArray(jsonData)) {
// //                     const destinationArray = [];
// //                     for (const det of jsonData) {
// //                         if (det.reservationFor) {
// //                             destinationArray.push(det.reservationFor.arrivalAirport.city);
// //                         }
// //                     }
// //                     console.log(destinationArray);
// //                     resolve(destinationArray);
// //                 } else {
// //                     console.error('JSON data is not an array.');
// //                     reject('JSON data is not an array.');
// //                 }
// //             } catch (parseError) {
// //                 console.error('Error parsing JSON:', parseError);
// //                 reject(parseError);
// //             }
// //         });
// //     });
// // }

// // module.exports = {
// //     JSONExtractor,
// //     JSONdestExtractor
// // }
// // // const axios = require('axios');
// // // const options = {
// // //     method: 'GET',
// // //     url: 'https://flight-fare-search.p.rapidapi.com/v2/flights/',
// // //     params: {
// // //         from: 'MAA',
// // //         to: 'BOM',
// // //         date: '20-09-2023',
// // //         adult: '1',
// // //         type: 'economy',
// // //         currency: 'USD'
// // //     },
// // //     headers: {
// // //             'X-RapidAPI-Key': 'c746319e9bmshcab9153b3cb3d2ap16a0d6jsn67a85efecaf0',
// // //             'X-RapidAPI-Host': 'flight-fare-search.p.rapidapi.com'
// // //     }
// // // };
// // // async function fun() {
// // //     try {
// // //         const response = await axios.request(options);
// // //         console.log(response.data);
// // //     } catch (error) {
// // //         console.error(error);
// // //     }
// // // }
// // // fun()

// // require the Unirest or any other module to make an HTTP GET request

// // const unirest = require('unirest')


// // unirest.get(`https://api.aviationstack.com/v1/flights
// // ? access_key =9094cb937b29bb87b9c704e21ee07e01`)
// // .then(response => {
// //     console.log(response.body);
// // })
// // .catch(error => {
// //     return error
// // });

// const axios = require('axios');
// const params = {
//   access_key: '9094cb937b29bb87b9c704e21ee07e01'
// }

// axios.get(`flights.json`)
//   .then(response => {
//     const apiResponse = response.data;
//     if (Array.isArray(apiResponse['results'])) {
//         apiResponse['results'].forEach(flight => {
//             if (flight['reservationFor']) {
//                 console.log(`${flight['reservationFor']['flightNumber']} flight ${flight['reservationFor']['departureAirport']['city']}`)
//             }
//         });
//     }
//   }).catch(error => {
//     console.log(error);
//   });
