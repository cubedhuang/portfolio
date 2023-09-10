<script lang="ts">
	import { useLanyard } from 'sk-lanyard';

	const discordId = '299707523370319883';
	const lanyard = useLanyard({
		method: 'rest',
		id: discordId
	});

	const statusColors: Record<string, string> = {
		online: 'bg-emerald-500',
		idle: 'bg-amber-400',
		dnd: 'bg-rose-400'
	};

	$: customStatus = $lanyard?.activities.find(a => a.type === 4);
</script>

<div class="mt-8 flex rounded-full items-center bg-zinc-900">
	<div class="relative w-20 h-20 shrink-0">
		{#if $lanyard}
			<img
				src="https://cdn.discordapp.com/avatars/{discordId}/{$lanyard
					?.discord_user.avatar}"
				alt=""
				class="w-20 h-20 rounded-full bg-zinc-800"
			/>

			<span
				class="absolute w-4 h-4 bottom-1 right-1 rounded-full ring-4 ring-zinc-900
					{statusColors[$lanyard.discord_status]}"
			/>
		{:else}
			<div class="w-20 h-20 rounded-full bg-zinc-800" />
		{/if}
	</div>

	<div class="ml-4 py-2 pr-8">
		<p class="text-white font-semibold">
			{#if $lanyard}
				{$lanyard.discord_user.display_name}

				<span class="ml-2 text-zinc-400 font-normal">
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
