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

	import SearchIcon from '$lib/components/SearchIcon/SearchIcon.svelte';
	import ErrorIcon from '$lib/components/ErrorIcon/ErrorIcon.svelte';
	import ArrowIcon from '$lib/components/ArrowIcon/ArrowIcon.svelte';
	import GlassesIcon from '$lib/components/GlassesIcon/GlassesIcon.svelte';

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

		switch (true) {
			case age < 20:
				return 'Com essa idade, é normal sentir inseguranças e incertezas — confie no seu potencial!';
			case age < 30:
				return 'Os 20 e poucos são cheios de descobertas e decisões importantes. Continue explorando com coragem.';
			case age < 40:
				return 'Você já viveu bastante e ainda tem muito pela frente. Aproveite com sabedoria e equilíbrio.';
			case age < 60:
				return 'Essa fase costuma trazer mais estabilidade. Que você continue crescendo com propósito.';
			default:
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
					<SearchIcon />
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
				<ErrorIcon />
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
				<ArrowIcon />
			</div>
		{:else}
			<div id="answer-part-data">
				<GlassesIcon />
				<h1 id="main-title-answer">De acordo com nossos dados...</h1>
				<p id="explanation-answer">
					A idade estimada para <span>{name}</span> é de <span>{age}</span> anos!
				</p>
				<p id="answer">{personalMessage}</p>
			</div>
		{/if}
	</div>
</main>

