function formatName(fullName) {
  const [lastName, name] = fullName.split(',')
  const firstLastName = lastName.trim().split(' ')[0]
  const firstName = name.trim().split(' ')[0]
  return `${firstName} ${firstLastName}`
}

window.onload = async () => {
  const res = await fetch(
    'https://dev-ajedrezcostaricafuncs.azurewebsites.net/api/ChessResultsPostResults?code=BB-Yryn5ch_ShHQ-oNJbnd9ktaTMYvZflkkcXAIaH3ehAzFut4u8Ww==&chessResultsId=tnr1177551'
  )
  const rounds = await res.json()

  const container = document.getElementById('pairings-container')
  const roundButtonsContainer = document.getElementById('round-buttons')

  function showRound(index) {
    document.getElementById('round-number').textContent = `Ronda ${index + 1}`
    container.innerHTML = '' // Limpiar contenido anterior

    rounds[index].pairings.forEach((pairing) => {
      const row = document.createElement('div')
      row.className = 'pairing-row'

      row.innerHTML = `
        <div class="player-white player">
          <p class="player-name">${formatName(pairing.white.name)}</p>
          <p class="player-club">${pairing.white.club || 'Sin club'}</p>
        </div>
        <div class="result">
          <p>${pairing.result}</p>
        </div>
        <div class="player-black player">
          <p class="player-name">${formatName(pairing.black.name)}</p>
          <p class="player-club">${pairing.black.club || 'Sin club'}</p>
        </div>
      `
      container.appendChild(row)
    })
  }

  // Crear botones para cada ronda
  rounds.forEach((_, index) => {
    const btn = document.createElement('button')
    btn.textContent = `Ronda ${index + 1}`
    btn.className = 'round-button'
    btn.onclick = () => showRound(index)
    roundButtonsContainer.appendChild(btn)
  })

  // Mostrar la primera ronda al cargar
  showRound(0)
}
