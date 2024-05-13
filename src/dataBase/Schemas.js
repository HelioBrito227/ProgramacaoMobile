export const Tables = {
    projetos:[
        'id INTEGER PRIMARY KEY NOT NULL',
        'nome_cliente VARCHAR(50)',
        'data_orcamento DATE',
        'custo REAL',
        'prazo VARCHAR(15)'
    ],
    variaveis:[
        'id INTEGER PRIMARY KEY NOT NULL',
        'custo_ferro REAL ',
        'custo_dia_obra REAL'
    ]
}