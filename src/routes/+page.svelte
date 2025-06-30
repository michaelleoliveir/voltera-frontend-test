<!-- 
	Projeto de desafio técnico para vaga de Front-End na Voltera.
	Desenvolvido com SvelteKit.
	O projeto utiliza a API pública agify.io para estimar idade com base em nomes.
	Estilização 100% feita com CSS puro.
	Autora: Michaelle Oliveira
-->

<!-- script para fazer a funcionalidade do código -->
<script lang="ts">
	import { goto } from "$app/navigation";

	let name = '';
	let timeout: ReturnType<typeof setTimeout>;

	function handleInput(e: Event) {
		clearTimeout(timeout);

		name = (e.target as HTMLInputElement).value.trim();

		timeout = setTimeout(() => {
			if(name) {
				goto(`/?name=${encodeURIComponent(name)}`, {replaceState: true, keepFocus: true});
			} else {
				goto('/', {replaceState: true, keepFocus: true});
			}
		}, 800)
	}
</script>

<!-- criando a parte visual -->
<main>
	<div id="input-part">
		<div id="title">
			<h1 id="main-title">Insira seu nome</h1>
			<h2 id="subtitle">E descobriremos sua <span>idade</span></h2>
		</div>
		<div class="InputContainer">
			<input
				placeholder="Digite seu nome..."
				id="input"
				class="input"
				name="text"
				type="text"
				autocomplete="off"
				on:input={handleInput}
			/>

			<label class="labelforsearch" for="input">
				<svg class="searchIcon" viewBox="0 0 512 512">
					<path
						d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
					></path>
				</svg>
			</label>
		</div>
	</div>

	<div id="line"></div>

	<div id="anwser-part">
		<h1 id="main-title-answer">Bem vindos ao <span>agify.io</span>!</h1>
		<p id="explanation-answer">
			Essa aplicação utiliza a API gratuita <span>agify.io</span>, que estima a idade de uma pessoa
			com base no nome fornecido. Basta digitar um nome do lado esquerdo e descobrir a mágica!
		</p>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 128 128"
			width="55"
			height="55"
			fill="#eb3b5a"
		>
			<path
				d="M64 .3C28.7.3 0 28.8 0 64s28.7 63.7 64 63.7 64-28.5 64-63.7S99.3.3 64 .3zm0 121C32.2 121.3 6.4 95.7 6.4 64 6.4 32.3 32.2 6.7 64 6.7s57.6 25.7 57.6 57.3c0 31.7-25.8 57.3-57.6 57.3zm1.3-82.8L41.6 64l23.6 25.5h13.5L54.4 64l24.4-25.5H65.3z"
			/>
		</svg>
	</div>
</main>

<!-- estilização -->
<style>
	@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');

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
	}

	span {
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
		padding: 4.5rem;
	}

	#line {
		height: 90%;
		width: 2px;
		background-color: #eb3b5b81;
	}

	#title {
		text-align: center;
	}

	#main-title,
	#main-title-answer {
		font-family: 'Roboto Mono', monospace;
	}

	#main-title {
		font-size: 2.5rem;
		margin-bottom: 0rem;
	}

	#main-title-answer {
		font-size: 2rem;
	}

	#subtitle {
		font-size: 2.5rem;
		margin-top: 0rem;
		font-family: 'Roboto Mono', monospace;

		overflow: hidden;
		white-space: nowrap;
		border-right: 2px solid;
		animation:
			typing 2s steps(20),
			blink 0.75s step-end infinite;
	}

	#explanation-answer {
		font-size: 1.3rem;
		font-family: "DM Sans", sans-serif;
		text-align: center;
		margin-top: 1rem;
		margin-bottom: 2rem;
		line-height: 1.5;
	}

	#anwser-part svg {
		animation: bounce 1.4s infinite;
	}

	.InputContainer {
		height: 3.3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 1rem;
		overflow: hidden;
		cursor: pointer;
		padding-left: 1rem;
		box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.134);
		background-color: white;
	}

	.input {
		font-family: "DM Sans", sans-serif;
		width: 240px;
		border: none;
		outline: none;
		font-size: 1em;
		background-color: white;
	}

	.labelforsearch {
		cursor: text;
		padding: 0px 12px;
		background-color: white;
	}

	.searchIcon {
		width: 13px;
		background-color: white;
	}

	.searchIcon path {
		fill: #eb3b5a;
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

	@keyframes bounce {
		0%,
		100% {
			transform: translateX(0);
		}
		50% {
			transform: translateX(-10px);
		}
	}
</style>
