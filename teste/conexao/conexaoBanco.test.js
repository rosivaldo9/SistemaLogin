const conexaoBanco = require('../../src/database/index') 


describe('Testando conexão com o banco', ()=>{
    
    it('testando conexão', ()=>{
        expect(conexaoBanco).not.toBe(undefined);
    })

})