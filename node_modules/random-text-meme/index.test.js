const proxyquire =  require('proxyquire').noCallThru();
const expect = require('chai').expect;
const fullEmoji = proxyquire('./index.js', { './emoji.json': require('./emoji.test.json')});
const emptyEmoji = proxyquire('./index.js', { './emoji.json': {} });

describe('we <3 testing =^._.^= ∫', () =>  {
    describe('ᕕ( ᐛ )ᕗ Tests loadEmoji', () => {
        it('三三ᕕ( ᐛ )ᕗ loading all emoji', () => {
            expect(JSON.stringify(fullEmoji.getAllEmoji())).to.be.equal('["(=^･ω･^=)","(^・x・^)","/ᐠ｡ꞈ｡ᐟ❁ \\\\∫","ʅ(ツ)ʃ","乁(ツ)ㄏ","乁(ツ)∫","(╯°□°）╯︵ ┻━┻","(┛◉Д◉)┛彡┻━┻","(ﾉ≧∇≦)ﾉ ﾐ ┸━┸"]');
        });
        it('三三ᕕ( ᐛ )ᕗ loading all emoji by specific theme', () => {
            expect(JSON.stringify(fullEmoji.getAllEmoji('dunno'))).to.be.equal('["ʅ(ツ)ʃ","乁(ツ)ㄏ","乁(ツ)∫"]');
        });
    });

    describe('ᕕ( ᐛ )ᕗ Tests loadOneEmoji', () => {
        it('三三ᕕ( ᐛ )ᕗ checking randomness', () => {
            const emoji = fullEmoji.getEmoji();
            let i = 0;
            let diffFound = false;
            while(i < 10) {
                if (emoji !== fullEmoji.getEmoji()) {
                    diffFound = true;
                }
                i++;
            }
            expect(diffFound).to.be.true;
        });
        it('三三ᕕ( ᐛ )ᕗ checking not found emoji', () => {
            expect(emptyEmoji.getEmoji('maybe?')).to.be.equal('(╯°□°）╯︵ ᔭ0ᔭ');
        });
    });

    describe('ᕕ( ᐛ )ᕗ Tests loadDictKeys', () => {
        it('三三ᕕ( ᐛ )ᕗ getting few themes', () => {
            expect(JSON.stringify(fullEmoji.getThemes())).to.be.equal('["cat-bob","dunno","flip-table"]');
        });
        it('三三ᕕ( ᐛ )ᕗ getting empty themes', () => {
            expect(JSON.stringify(emptyEmoji.getThemes())).to.be.equal('[]');
        });
    });
});
