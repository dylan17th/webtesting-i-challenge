const {succeed, fail , repair , get} = require('./enhancer.js');

describe('testing the enhancer module', ()=> {
    describe('testing the .repair', () => {
        it('it should return a new item with 100 durablility', ()=> {
            expect(repair({name: 'new item', durability: 40 , enchancement: 20})).toEqual({name: 'new item', durability: 100 , enchancement: 20});
            expect(repair({name: 'newer item', durability: 50 , enchancement: 20})).toEqual({name: 'newer item', durability: 100 , enchancement: 20});
            expect(repair({name: 'newest item', durability: 80 , enchancement: 20})).toEqual({name: 'newest item', durability: 100 , enchancement: 20});
        });
    });
    describe('testing the .success', ()=> {
        it('The items enhancement increases by 1', ()=> {
            expect(succeed({name: 'new item', durability: 40 , enchancement: 11})).toEqual({name: 'new item', durability: 40 , enchancement: 12});
            expect(succeed({name: 'newer item', durability: 50 , enchancement: 10})).toEqual({name: 'newer item', durability: 50 , enchancement: 11});
            expect(succeed({name: 'newest item', durability: 80 , enchancement: 15})).toEqual({name: 'newest item', durability: 80 , enchancement: 16});
        });
        it('If the item enhancement level is 20, the enhancement level is not changed', ()=> {
            expect(succeed({name: 'newest item', durability: 80 , enchancement: 20})).toEqual({name: 'newest item', durability: 80 , enchancement: 20});
            expect(succeed({name: 'newest item', durability: 80 , enchancement: 20})).not.toEqual({name: 'newest item', durability: 80 , enchancement: 19});
            expect(succeed({name: 'newest item', durability: 80 , enchancement: 20})).not.toEqual({name: 'newest item', durability: 80 , enchancement: 22});
        });
    });
    describe('testing the .fail', ()=> {
        it('If the items enhancement is less than 15, the durability of the item is decreased by 5.', ()=>{
            expect(fail({name: 'newest item', durability: 80 , enchancement: 14})).toEqual({name: 'newest item', durability: 75 , enchancement: 14});
            expect(fail({name: 'newest item', durability: 70 , enchancement: 13})).toEqual({name: 'newest item', durability: 65 , enchancement: 13});
            expect(fail({name: 'newest item', durability: 90 , enchancement: 6})).toEqual({name: 'newest item', durability: 85 , enchancement: 6});
        });
        it('If the items enhancement is 15 or more, the durability of the item is decreased by 10', ()=> {
            expect(fail({name: 'newest item', durability: 90 , enchancement: 15})).toEqual({name: 'newest item', durability: 80 , enchancement: 15});
            expect(fail({name: 'newest item', durability: 90 , enchancement: 16})).toEqual({name: 'newest item', durability: 80 , enchancement: 16});
            expect(fail({name: 'newest item', durability: 90 , enchancement: 15})).not.toEqual({name: 'newest item', durability: 80 , enchancement: 14});
            expect(fail({name: 'newest item', durability: 90 , enchancement: 15})).not.toEqual({name: 'newest item', durability: 80 , enchancement: 16});
        });
        it('If the items enhancement level is greater than 16, the enhancement level decreases by 1', ()=> {
            expect(fail({name: 'newest item', durability: 90 , enchancement: 17})).toEqual({name: 'newest item', durability: 80 , enchancement: 16});
            expect(fail({name: 'newest item', durability: 90 , enchancement: 18})).toEqual({name: 'newest item', durability: 80 , enchancement: 17});
            expect(fail({name: 'newest item', durability: 90 , enchancement: 19})).toEqual({name: 'newest item', durability: 80 , enchancement: 18});
        });
    })
    describe('testing the .get', ()=> {
        it('if the enhancement level is 0, the the name is not modified.', ()=> {
            expect(get({name: 'newest item', durability: 90 , enchancement: 0})).toEqual({name: 'newest item', durability: 90 , enchancement: 0});
        })
        it('if the enhancement level is greater than 0, change the name to include the enhancement level', ()=> {
            expect(get({name: 'newest item', durability: 90 , enchancement: 17})).toEqual({name: '[+17] newest item', durability: 90 , enchancement: 17});
            expect(get({name: 'newest item', durability: 90 , enchancement: 18})).toEqual({name: '[+18] newest item', durability: 90 , enchancement: 18});
            expect(get({name: 'newest item', durability: 90 , enchancement: 19})).toEqual({name: '[+19] newest item', durability: 90 , enchancement: 19});
        })
    })
})