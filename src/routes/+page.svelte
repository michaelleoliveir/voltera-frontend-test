<!-- 
	Projeto de desafio técnico para vaga de Front-End na Voltera.
	Desenvolvido com Svelte e SvelteKit.
	O projeto utiliza a API pública agify.io para estimar idade com base em nomes.
	Autora: Michaelle Oliveira
-->

<!-- script para fazer a funcionalidade do código -->
<script lang="ts">
	import { afterNavigate, beforeNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';

	$: error = $page.data.error;
	$: age = $page.data.age;
	$: personalMessage = getPersonalMessage(age);
	$: name = $page.url.searchParams.get('name') ?? '';

	let loading = false;
	let inputName = '';
	let timeout: ReturnType<typeof setTimeout>;
	let isDark = false;

	function handleInput(e: Event) {
		clearTimeout(timeout);

		inputName = (e.target as HTMLInputElement).value.trim();

		timeout = setTimeout(() => {
			loading = true;
			if (inputName) {
				goto(`/?name=${encodeURIComponent(inputName)}`, { replaceState: true, keepFocus: true });
			} else {
				goto('/', { replaceState: true, keepFocus: true });
			}
		}, 1000);
	}

	beforeNavigate(() => {
		loading = true;
	});

	afterNavigate(() => {
		loading = false;
	});

	function getPersonalMessage(age: number | null): string {
		if (age === null) return '';

		if (age < 20) {
			return 'Com essa idade, é normal sentir inseguranças e incertezas — confie no seu potencial!';
		} else if (age < 30) {
			return 'Os 20 e poucos são cheios de descobertas e decisões importantes. Continue explorando com coragem.';
		} else if (age < 40) {
			return 'Você já viveu bastante e ainda tem muito pela frente. Aproveite com sabedoria e equilíbrio.';
		} else if (age < 60) {
			return 'Essa fase costuma trazer mais estabilidade. Que você continue crescendo com propósito.';
		} else {
			return 'A vida é um presente em todas as idades. Sua experiência é valiosa e merece ser celebrada!';
		}
	}

	function toggleTheme() {
		isDark = !isDark;
	}
</script>

<!-- criando a parte visual -->
<main class:dark-toggle={isDark}>
	<div id="toggle">
		<button
			aria-label="Toggle Button"
			id="toggle-button"
			class:dark-toggle={isDark}
			on:click={toggleTheme}
		>
			<div id="toggle-indicator" class:dark-toggle={isDark}></div>
		</button>
	</div>

	<div id="wrapper">
		<div id="input-part">
			<div id="title">
				<h1 id="main-title">Insira seu nome</h1>
				<h2 id="subtitle">E descobriremos sua <span>idade</span></h2>
			</div>
			<div id="input-container">
				<input
					placeholder="Digite seu nome..."
					id="input"
					class="input"
					name="text"
					type="text"
					autocomplete="off"
					on:input={handleInput}
				/>
				<label class="label-for-search" for="input">
					<svg class="search-icon" viewBox="0 0 512 512">
						<path
							d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
						></path>
					</svg>
				</label>
			</div>
		</div>

		<div id="line"></div>

		{#if loading}
			<div id="loading-part">
				<span id="loader"></span>
			</div>
		{:else if error}
			<div id="error-part">
				<svg
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					width="85"
					height="85"
					stroke="#eb3b5a"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="feather feather-alert-triangle"
				>
					<path
						d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
					/>
					<line x1="12" y1="9" x2="12" y2="13" />
					<line x1="12" y1="17" x2="12.01" y2="17" />
				</svg>
				<h1 id="main-title-error">Ops, algo deu errado!</h1>
				<p id="explanation-error">
					Não encontramos uma idade para esse nome. Verifique se foi digitado corretamente.
				</p>
			</div>
		{:else if age === null}
			<div id="answer-part">
				<h1 id="main-title-answer">Bem vindos ao <span>agify.io</span>!</h1>
				<p id="explanation-answer">
					Essa aplicação utiliza a API gratuita <span>agify.io</span>, que estima a idade de uma
					pessoa com base no nome fornecido. Basta digitar um nome e descobrir a mágica!
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
		{:else}
			<div id="answer-part-data">
				<svg
					fill="#eb3b5b"
					viewBox="-3.2 -3.2 38.40 38.40"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					stroke="#eb3b5b"
					transform="matrix(1, 0, 0, 1, 0, 0)"
					><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
						id="SVGRepo_tracerCarrier"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke="#CCCCCC"
						stroke-width="0.32"
					></g><g id="SVGRepo_iconCarrier">
						<title>glasses</title>
						<path
							d="M30 15.25h-1.326c-0.374-2.835-2.775-5-5.682-5-2.804 0-5.138 2.015-5.632 4.677l-0.005 0.035c-0.406-0.124-0.872-0.195-1.355-0.195s-0.949 0.071-1.389 0.204l0.034-0.009c-0.499-2.697-2.833-4.712-5.637-4.712-2.907 0-5.308 2.165-5.679 4.971l-0.003 0.029h-1.326c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h1.326c0.369 2.834 2.768 5 5.673 5 2.981 0 5.429-2.281 5.695-5.193l0.002-0.022c0.385-0.164 0.834-0.259 1.304-0.259s0.919 0.095 1.327 0.267l-0.022-0.008c0.267 2.934 2.715 5.215 5.697 5.215 2.905 0 5.304-2.166 5.67-4.971l0.003-0.029h1.326c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0zM9 20.25c-2.347 0-4.25-1.903-4.25-4.25s1.903-4.25 4.25-4.25c2.347 0 4.25 1.903 4.25 4.25v0c-0.003 2.346-1.904 4.247-4.25 4.25h-0zM23 20.25c-2.347 0-4.25-1.903-4.25-4.25s1.903-4.25 4.25-4.25c2.347 0 4.25 1.903 4.25 4.25v0c-0.003 2.346-1.904 4.247-4.25 4.25h-0z"
						></path>
					</g></svg
				>
				<h1 id="main-title-answer">De acordo com nossos dados...</h1>
				<p id="explanation-answer">
					A idade estimada para <span>{name}</span> é de <span>{age}</span> anos!
				</p>
				<p id="answer">{personalMessage}</p>
			</div>
		{/if}
	</div>
</main>

