var moment = require('moment')

const getDate = (d) => {
    return moment().add('days', d).format('DD/MM/YYYY')
}

var id = 0
var cotacoes = [
    {
        id: ++id,
        nome: "PETROBRAS ON (PETR3.SA)",
        cotacao: 24.07,
        variacao: 3.26,
        aumento: true,
        logo: '/img/br.png',
        historico: [
            { data: getDate(-1), valor: 23.31, aumento:true, variacao: 1.83 },
            { data: getDate(-2), valor: 22.89, aumento:false, variacao: 3.54 },
            { data: getDate(-3), valor: 23.73, aumento:false, variacao: 2.71 },
            { data: getDate(-4), valor: 24.39, aumento:true, variacao: 0.16 },
            { data: getDate(-5), valor: 24.35, aumento:true, variacao: 2.31 },
            { data: getDate(-6), valor: 23.80, aumento:true, variacao: 3.93 },
            { data: getDate(-7), valor: 22.90, aumento:false, variacao: 2.88 },
            { data: getDate(-8), valor: 23.58, aumento:true, variacao: 1.03 },
            { data: getDate(-9), valor: 23.34, aumento:true, variacao: 2.73 },
            { data: getDate(-01), valor: 22.72, aumento:false, variacao: 0.35 },
            { data: getDate(-11), valor: 22.80, aumento:true, variacao: 0.26 },
            { data: getDate(-12), valor: 22.74, aumento:false, variacao: 2.65 },
            { data: getDate(-13), valor: 23.36, aumento:true, variacao: 1.43 },
            { data: getDate(-14), valor: 23.03, aumento:false, variacao: 1.24 },
            { data: getDate(-15), valor: 23.32, aumento:false, variacao: 2.47 },
            { data: getDate(-16), valor: 23.91, aumento:true, variacao: 0.84 },
            { data: getDate(-17), valor: 23.71, aumento:true, variacao: 0.34 },
            { data: getDate(-18), valor: 23.63, aumento:false, variacao: 0.55 },
            { data: getDate(-19), valor: 23.76, aumento:true, variacao: 3.80 },
            { data: getDate(-20), valor: 22.89, aumento:true, variacao: 1.33 }
        ]

    },
    {
        id: ++id,
        nome: "PETROBRAS PN (PETR4.SA)",
        cotacao: 21.80,
        variacao: 3.66,
        aumento: true,
        logo: '/img/br.png',
        historico: [
            { data: getDate(-1), valor: 21.03, aumento:true, variacao: 1.99 },
            { data: getDate(-2), valor: 20.62, aumento:false, variacao: 2.74 },
            { data: getDate(-3), valor: 21.20, aumento:false, variacao: 2.21 },
            { data: getDate(-4), valor: 21.68, aumento:false, variacao: 0.55 },
            { data: getDate(-5), valor: 21.80, aumento:true, variacao: 1.87 },
            { data: getDate(-6), valor: 21.40, aumento:true, variacao: 4.24 },
            { data: getDate(-7), valor: 20.53, aumento:false, variacao: 3.52 },
            { data: getDate(-8), valor: 21.28, aumento:true, variacao: 0.61 },
            { data: getDate(-9), valor: 21.15, aumento:true, variacao: 3.78 },
            { data: getDate(-10), valor: 20.38, aumento:false, variacao: 1.59 },
            { data: getDate(-11), valor: 20.71, aumento:false, variacao: 0.91 },
            { data: getDate(-12), valor: 20.90, aumento:false, variacao: 2.38 },
            { data: getDate(-13), valor: 21.41, aumento:true, variacao: 0.99 },
            { data: getDate(-14), valor: 21.20, aumento:false, variacao: 1.12 },
            { data: getDate(-15), valor: 21.44, aumento:false, variacao: 2.68 },
            { data: getDate(-16), valor: 22.03, aumento:true, variacao: 1.29 },
            { data: getDate(-17), valor: 21.75, aumento:true, variacao: 0.14 },
            { data: getDate(-18), valor: 21.72, aumento:false, variacao: 1.50 },
            { data: getDate(-19), valor: 22.05, aumento:true, variacao: 4.21 },
            { data: getDate(-20), valor: 21.16, aumento:true, variacao: 1.10 }
        ]
    },
    {
        id: ++id,
        nome: "VALE ON (VALE3.SA)",
        cotacao: 47.48,
        variacao: 3.37,
        aumento: true,
        logo: '/img/vale.png'
    },
    {
        id: ++id,
        nome: "ITAUUNIBANCO PN (ITUB4.SA)",
        cotacao: 51.48,
        variacao: 1.90,
        aumento: true,
        logo: '/img/itau.png'
    },
    {
        id: ++id,
        nome: "BRADESCO PN (BBDC4.SA)",
        cotacao: 34.81,
        variacao: 3.36,
        aumento: true,
        logo: '/img/bradescon.png'
    },
    {
        id: ++id,
        nome: "BRASIL ON (BBAS3.SA)",
        cotacao:38.02,
        variacao: 2.29,
        aumento: true,
        img: '/img/bb.png'
    },
    {
        id: ++id,
        nome: "BRF FOODS ON (BRFS3.SA)",
        cotacao: 23.04,
        variacao: 9.51,
        aumento: true,
        logo: '/img/brf.png'
    }
]

const fastify = require('fastify')()
const cors = require('cors')
fastify.use(cors())
const path = require('path')

fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'public')
})

fastify.get('/cotacoes', (request, reply) => {
  reply.send(cotacoes.map((c) => { 
      return {
          id: c.id,
          nome: c.nome,
          cotacao: c.cotacao,
          variacao: c.variacao,
          aumento: c.aumento,
          logo: c.logo
        } 
    }))
})

fastify.get('/cotacoes/:id', (request, reply) => {
    var cotacao = cotacoes.filter((c) => { 
        if(c.id == request.params.id) return c
    })
    reply.send(cotacao.length ? cotacao[0] : {})
  })

var port = parseInt(process.argv.join(' ').split('--port=')[1]) || 3000

fastify.listen(port, '0.0.0.0', (err) => {
  if (err) throw err
  console.log(`API rodando na porta ${fastify.server.address().port}`)
})