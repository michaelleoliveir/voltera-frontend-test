<!-- script para fazer a funcionalidade do código -->
<script>
</script>

<!-- criando a parte visual -->
<main>
	<div id="input-part">
		<div id="title">
			<h1 id="main-title">Insira seu <span>nome</span></h1>
			<h2 id="subtitle">E descobriremos sua <span>idade</span></h2>
		</div>
		<input type="text" placeholder="Digite o seu nome..." />
	</div>

    <div id="line"></div>

	<div id="anwser-part">
		<h1>Teste</h1>
	</div>
</main>

<!-- estilização -->
<style>
	* {
		background-color: #f5f5f4;
		color: #444444;
	}
	main {
		height: 100vh;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 4rem;
	}

	#subtitle span {
		font-style: italic;
		color: #eb3b5a;
	}

	#input-part,
	#anwser-part {
        flex: 1;
		width: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

    #line {
        height: 100%;
        width: 2px;
        background-color: #eb3b5b81;
    }

	#title {
		text-align: center;
	}

	#main-title {
		font-size: 2.5rem;
		margin-bottom: 0rem;
		font-family: 'Roboto Mono', monospace;
	}

	#subtitle {
		font-size: 2rem;
		margin-top: 0.5rem;
		font-family: 'Roboto Mono', monospace;

		overflow: hidden;
		white-space: nowrap;
		border-right: 2px solid;
		animation:
			typing 2s steps(20),
			blink 0.75s step-end infinite;
	}

	main input, main input:focus {
		width: 45%;
		font-size: 1rem;
		padding: 1.2rem;
		border: 2px solid #eb3b5a;
		border-radius: 1rem;
	}

	@keyframes typing {
		from {
			width: 0;
		}
		to {
			width: 100%;
		}
	}

	@keyframes blink {
		60% {
			border-color: transparent;
		}
	}
</style>
