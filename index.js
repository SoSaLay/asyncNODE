const stocks = [
    { "symbol": "AAPL", "company": "Apple Inc.", "currentPrice": 185.30, "change": "+2.45%" },
    { "symbol": "MSFT", "company": "Microsoft Corp", "currentPrice": 290.60, "change": "+1.80%" },
    { "symbol": "GOOGL", "company": "Alphabet Inc.", "currentPrice": 125.70, "change": "+1.50%" },
    { "symbol": "AMZN", "company": "Amazon.com Inc", "currentPrice": 140.50, "change": "+3.25%" },
    { "symbol": "TSLA", "company": "Tesla Inc.", "currentPrice": 900.50, "change": "+2.05%" }
];



const express = require('express')
const fs =require('fs')
const bodyPars= require ('body-parser')


const app= express()
app.use(express.json())
app.use(bodyPars.json())
const port= 3000






app.get('/', async (req,res)=>{
    await new Promise (resolve => setTimeout(resolve, 1000))
    res.send("Welcome to the stocks API")
})





// Create new stock entry
app.post('/stocks',(req,res)=>{
    const{symbol,company}=req.query
    
    if(!symbol || !company){
        return res.status(400).send('Missing symbol or company')
    }

    const newStock={
        symbol,
        company,
        currentPrice:'Updating...',
        change:'Updating...'
    }

    stocks.push(newStock)
    res.status(201).send(newStock)

})




// Get All stocks
app.get('/stocks',(req,res)=>{
res.send(stocks)
})


// Get Single stocks
app.get('/stocks/:symbol',(req,res)=>{
const symbol = req.params.symbol
const stock= stocks.find(f=> f.symbol=== symbol)

if (!stock){
    return res.status(404).send('Stock Not Found')
}

res.json(stock)

})



// Update a stock
app.put('/stocks/:symbol',(req,res)=>{
    const {symbol} = req.params;
    const stock= stocks.find(f=> f.symbol=== symbol)

    
    if (!stock){
        return res.status(404).send('Stock Not Found')
    }

    
    // Update the stock properties if provided in the request body
    const {currentPrice, change } = req.query;

    if(currentPrice) stock.currentPrice= parseInt(currentPrice)
    if(change) stock.change= change
    
    res.json(stock);


})




// Delete a stock
app.delete('/stocks/:symbol',(req,res)=>{
    const {symbol} = req.params;
    const stock= stocks.find(f=> f.symbol=== symbol)

    if (!stock){
        return res.status(400).send('Stock Not Found')
    }

    stocks.splice(stock,1)
    res.status(210).send("Succesful Deletion")
})





app.listen(port, ()=>{
console.log(`Server is running on http://localhost:${port}`)
})