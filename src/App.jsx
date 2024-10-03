import { useState } from 'react'

const App = () => {
  const [inputValue, setInputValue] = useState('')
  const [results, setResults] = useState([])

  const handleChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleClickSearch = async () => {
    if (!inputValue) return

    const response = await fetch(
      `https://api.github.com/search/users?q=${inputValue}`
    )
    const data = await response.json()
    setResults(data.items)
  }

  return (
    <div className="container">
      <h1>Project-5: GitHub User Search</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search GitHub Users"
      />
      <button onClick={handleClickSearch}>Search</button>

      <div className="results-container">
        <h2>Results</h2>
        {results.map((user) => (
          <div key={user.id} className="result-item">
            <img src={user.avatar_url} alt={user.login} />
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
              {user.login}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App

/*
rel="noopener noreferrer"

  noopener: Yeni sekme (_blank) açıldığında, açılan sekme, o bağlantıyı açan sayfanın JavaScript koduna erişebilir. Bu, bazı kötü niyetli durumlarda güvenlik riski oluşturabilir. noopener, bu erişimi engelleyerek güvenlik sağlar.
  noreferrer: Bu öznitelik, açılan sayfaya referrer (yönlendiren) bilgisi gönderilmesini engeller.

 noopener, yeni sekmenin orijinal sayfaya erişimini engellerken, noreferrer, yönlendiren URL’nin gönderilmesini durdurur. Bazı eski tarayıcılar noopener özniteliğini desteklemeyebilir, ancak noreferrer bu durumu kapsar. Bu nedenle, uyumluluk ve güvenliği artırmak için genellikle ikisi birden kullanılır.

 */
