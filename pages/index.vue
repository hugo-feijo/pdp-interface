<template>
  <div>
		<div>
			<PeopleHeader />
			<div >
				<form @submit.prevent="greet">
					<InputText type="text" v-model="text"/>
					<Button type="submit" label="Submit"/>
				</form>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from "primevue/usetoast";
const text = ref();
const toast = useToast();
const greet = () => {
	toast.add({severity: 'info', summary: 'Hello '  + text.value});
}
</script>


<style lang="scss">
</style>