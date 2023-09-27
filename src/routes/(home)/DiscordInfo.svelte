<script lang="ts">
	import { useLanyard } from 'sk-lanyard';

	import Discord from '$lib/components/icons/Discord.svelte';

	const discordId = '299707523370319883';
	const lanyard = useLanyard({
		method: 'rest',
		id: discordId
	});

	const statusColors: Record<string, string> = {
		online: 'bg-emerald-500',
		idle: 'bg-amber-400',
		dnd: 'bg-rose-400',
		offline: 'bg-gray-600'
	};

	$: customStatus = $lanyard?.activities.find(a => a.type === 4);
</script>

<div class="mt-8 flex rounded-full items-center bg-gray-900">
	<div class="relative w-20 h-20 shrink-0 rounded-full">
		{#if $lanyard}
			<object
				data="https://cdn.discordapp.com/avatars/{discordId}/{$lanyard
					.discord_user.avatar}"
				type="image/png"
				class="w-20 h-20 rounded-full bg-gray-800 text-gray-400 grid place-items-center"
				aria-label="Discord Avatar"
			>
				<Discord />
			</object>

			<span
				class="z-10 absolute w-4 h-4 bottom-1 right-1 rounded-full ring-4 ring-gray-900
					{statusColors[$lanyard.discord_status]}"
			/>
		{:else}
			<div
				class="w-20 h-20 rounded-full bg-gray-800 text-gray-400 grid place-items-center"
			>
				<Discord />
			</div>
		{/if}
	</div>

	<div class="ml-4 py-2 pr-6">
		<p class="line-clamp-1 break-all text-gray-400">
			{#if $lanyard}
				<span class="font-semibold text-white">
					{$lanyard.discord_user.display_name}
				</span>

				<span class="ml-1">
					{$lanyard.discord_user.username}
				</span>
			{/if}
		</p>

		{#if customStatus}
			<p class="flex items-center text-sm">
				{#if customStatus.emoji}
					<img
						src="https://cdn.discordapp.com/emojis/{customStatus
							.emoji.id}.png"
						alt=""
						class="w-5 h-5 mr-1"
					/>
				{/if}

				<span class="line-clamp-1 break-all">
					{customStatus.state}
				</span>
			</p>
		{/if}
	</div>
</div>
