import { Component } from '@angular/core';

import * as io from "socket.io-client";

import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'voteApp';
	socket: SocketIOClient.Socket;
	voteMessage = "";

	// Voting Variables
	selectedValue: number;
	pollObj = {
		question: "",
		options: [
		],
	};

	// Chart Variables
	chartReady = false;
	public pieChartOptions: ChartOptions = {
		responsive: true,
	}
	public pieChartLabels: Label[] = [];
	public pieChartData: SingleDataSet[] = [];
	public pieChartType: ChartType = 'pie';
	public pieChartLegend = true;
	public pieChartPlugins = [];

	constructor() {
		this.socket = io.connect();

		monkeyPatchChartJsTooltip();
		monkeyPatchChartJsLegend();
	}

	ngOnInit() {
		this.listenForPollObj();
		this.listenForVoteReturn();
	}

	listenForPollObj() {
		this.socket.on("pollObj", data => {
			this.pollObj = data;
			console.log("Poll Object Recieved");
			
			// Once Poll Object recieved add to pie chart
			this.pieChartLabels = []
			this.pieChartData = []

			for (let option of this.pollObj.options) {
				this.pieChartLabels.push(option.text);
				this.pieChartData.push(option.count);

				// Tell Frontend that chart is ready to dispaly
				this.chartReady = true;
			}
		});
	}

	listenForVoteReturn() {
		this.socket.on("voteReturnEvent", data => {
			this.voteMessage = data.message;
		})
	}

	onSelectVote(value) {
		this.selectedValue = value;
	}

	onSendVote() {
		this.socket.emit("newVote", this.selectedValue);
	}

	onResetCounts() {
		this.socket.emit("resetCounts");
	}
}
