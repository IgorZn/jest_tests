const axios = require("axios")

let cleanData, rawData

const yearsData = async (attempts = 100) => {
    const filteredData = []
    const rawData = []
    const promises = []
    for (let i = 0; i < attempts; i++) {
        promises.push(
            axios.get('http://numbersapi.com/random/year')
                .then(res => {
                    const regex = /\d{1,2}th|\d{1,2}st|\d{1,2}rd/g;
                    if (Boolean(res.data.match(regex))) {
                        filteredData.push(res.data)
                    } else {
                        rawData.push(res.data)
                    }
                })
        )
    }

    await Promise.all(promises)
        .then(() => {
            console.log('Filtered Data:', filteredData.length)
            console.log('Raw Data:', rawData.length)
        });

    return [filteredData, rawData]
}

beforeAll(async () => {
    [cleanData, rawData] = await yearsData()
    // console.log('cleanData:', cleanData)
    // console.log('rawData:', rawData)
})


describe('Numbers API', () => {
    it('100 элементов всего', () => {
        expect([...cleanData, ...rawData].length).toEqual(100);
    });

    it('Больше или один элемент', () => {
        expect(cleanData.length).toBeGreaterThan(1);
    })

    it.skip('Пустой', () => {
        // Мы знаем, что массив будет пустой?
        // Тогда какие обстоятельства такого случая?
        // Надо уточнения, пока звучит странно.

        expect(true).toEqual(true)
    })

    it('Массив Не пустой', () => {
        expect(cleanData.length).not.toEqual(0);
    })

    it('Каждая строка из массива минимум 5 слов', () => {
        for (const item of cleanData) {
            expect(item.length).toBeGreaterThan(5)
        }
    })
});