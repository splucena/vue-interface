<template>
	<div id="main-app" class="container">
		<div class="row justify-content-center">
			<add-appointment @add="addItem" />
			<search-appointments
				@searchRecords="searchAppointments"
				:myKey="filterKey"
				:myDir="filterDir"
				@requestKey="changeKey"
				@requestDir="changeDir"
			/>
			<appointment-list
				:appointments="filteredApts"
				@remove="removeItem"
				@edit="editItem"
			/>
		</div>
	</div>
</template>

<script>
// single import all
import axios from "axios";
import AppointmentList from "./components/AppointmentList.vue";
import AddAppointment from "./components/AddAppointment.vue";
import _ from "lodash";
import SearchAppointments from "./components/SearchAppointments.vue";

export default {
	name: "MainApp",
	data: () => {
		return {
			title: "Appointment List",
			appointments: [],
			filterKey: "petName",
			filterDir: "asc",
			aptIndex: 0,
			searchTerms: "",
		};
	},
	components: {
		//FontAwesomeIcon,
		AppointmentList,
		AddAppointment,
		SearchAppointments,
	},
	mounted: function() {
		// takes place when app is mounted/started
		// Todo: check all vue lifecycle methods

		axios.get("./data/appointments.json").then(
			(res) =>
				(this.appointments = res.data.map((item) => {
					item.aptId = this.aptIndex;
					this.aptIndex++;
					return item;
				}))
		);
	},
	computed: {
		searchedApts: function() {
			return this.appointments.filter((item) => {
				return (
					item.petName
						.toLowerCase()
						.match(this.searchTerms.toLowerCase()) ||
					item.petOwner
						.toLowerCase()
						.match(this.searchTerms.toLowerCase()) ||
					item.aptNotes
						.toLowerCase()
						.match(this.searchTerms.toLowerCase())
				);
			});
		},
		filteredApts: function() {
			return _.orderBy(
				this.searchedApts,
				(item) => {
					return item[this.filterKey].toLowerCase();
				},
				this.filterDir
			);
		},
	},
	methods: {
		removeItem: function(apt) {
			this.appointments = _.without(this.appointments, apt);
		},
		editItem: function(id, field, text) {
			const aptIndex = _.findIndex(this.appointments, {
				aptId: id,
			});
			this.appointments[aptIndex][field] = text;
		},
		addItem: function(apt) {
			apt.aptId = this.aptIndex;
			this.aptIndex++;
			this.appointments.push(apt);
		},
		searchAppointments: function(terms) {
			this.searchTerms = terms;
		},
		changeKey: function(value) {
			this.filterKey = value;
		},
		changeDir: function(value) {
			this.filterDir = value;
		},
	},
};
</script>

<style></style>
