export async function fetchCountries () {
    try {

        const res =  await fetch('https://restcountries.com/v3.1/region/ame')
        const data = await res.json()
        console.log(data)
        return data
    }
    catch (err) {
        return err
    }
} 