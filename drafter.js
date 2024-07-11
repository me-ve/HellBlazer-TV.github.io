const civilizations = {
	"base": [
		"America",
		"Arabia",
		"Assyria",
		"Austria",
		"Aztec",
		"Babylon",
		"Brazil",
		"Byzantium",
		"Carthage",
		"Celts",
		"China",
		"Denmark",
		"Egypt",
		"England",
		"Ethiopia",
		"France",
		"Germany",
		"Greece",
		"Huns",
		"Inca",
		"India",
		"Indonesia",
		"Iroquois",
		"Japan",
		"Korea",
		"Maya",
		"Mongolia",
		"Morocco",
		"Netherlands",
		"Ottomans",
		"Persia",
		"Poland",
		"Polynesia",
		"Portugal",
		"Rome",
		"Russia",
		"Shoshone",
		"Siam",
		"Songhai",
		"Spain",
		"Sweden",
		"Zulu",
	],
	"extra": [
		"Akkad",
		"Aksum",
		"Argentina",
		"Armenia",
		"Australia",
		"Ayyubids",
		"Belgium",
		"Boers",
		"Bolivia",
		"Brunei",
		"Bulgaria",
		"Burma",
		"Canada",
		"Chile",
		"Colombia",
		"Cuba",
		"Finland",
		"Franks",
		"Gaul",
		"Georgia",
		"Golden",
		"Goths",
		"Hittites",
		"Hungary",
		"Ireland",
		"Israel",
		"Italy",
		"Jerusalem",
		"Khmer",
		"Kilwa",
		"Kongo",
		"Lithuania",
		"Macedonian",
		"Manchuria",
		"Maori",
		"Madagascar",
		"Maurya",
		"Mexican",
		"Moors",
		"Mysore",
		"NewZealand",
		"Nabatea",
		"Normandy",
		"Norway",
		"Nubia",
		"Oman",
		"Palmyra",
		"Philippines",
		"Phoenician",
		"Prussian",
		"Romania",
		"Scotland",
		"Sioux",
		"Sumeria",
		"Switzerland",
		"Tibet",
		"Timurids",
		"Tonga",
		"Turkey",
		"Ukraine",
		"UAE",
		"Venetian",
		"Vietnam",
		"Vatican",
		"Wales",
		"Yugoslavia",
		"Zimbabwe",
	]
}

const civilizationsFlattened = civilizations.base.concat(civilizations.extra).sort();

const baseCivCount = civilizations.base.length;
const extraCivCount = civilizations.extra.length;

const civCount = civilizationsFlattened.length;

$(document).ready(function () {
	var allCivs = {};
	for (const category in civilizations) {
		for (const civilization of civilizations[category]) {
			allCivs[civilization] = true;
		}
	}

	var bannedCivs = 0;
	var totalCivs = civCount;
	var titleHTML = "";
	var allclicked = false;

	// toggle disable or enabled civ
	$("#civilizations td").bind('click', toggleState)

	function toggleState(e) {        // function_tr
		if (!$(this).is(':animated')) {
			if ($(this).css('opacity') < 1) {
				$(this).css("text-decoration", "none");
				$(this).css("background-color", "#282828");
				$(this).fadeTo("slow", 1, function () { });
				allCivs[this.className] = true;
				bannedCivs--;
			} else {
				$(this).css("background-color", "#1a1a1a");
				$(this).fadeTo("slow", 0.25, function () { $(this).css("text-decoration", "line-through"); });
				allCivs[this.className] = false;
				bannedCivs++;
			}
		}

		updateBanned(totalCivs, bannedCivs);
	};

	//reset all to enabled
	$('#reset').click(function () {
		if ($('#forceNQ').is(':checked')) {
			$("[data-civ='base']").css(
				{
					"text-decoration": "none",
					"background-color": "#282828"
				});

			$("[data-civ='base']").fadeTo("slow", 1, function () { });

			$.each(allCivs, function (index, value) {
				allCivs[index] = civilizations.extra.includes(index);
			});

			totalCivs = baseCivCount
			bannedCivs = 0;
			updateBanned(totalCivs, bannedCivs);

		} else {
			$("[data-civ]").css(
				{
					"text-decoration": "none",
					"background-color": "#282828"
				});

			$("[data-civ]").fadeTo("slow", 1, function () { });

			$.each(allCivs, function (index, value) {
				allCivs[index] = true;
			});

			//update the title
			bannedCivs = 0;
			updateBanned(totalCivs, bannedCivs);
		}

		allclicked = false;
		$('#create').attr("disabled", false);
	});

	//set all to disabled
	$('#all').click(function () {
		$("[data-civ]").fadeTo("slow", 0.25, function () { $(this).css({ "text-decoration": "line-through", "background-color": "#1a1a1a" }); });;

		$.each(allCivs, function (index, value) {
			allCivs[index] = false;
		});

		//update the title
		totalCivs = civCount;
		bannedCivs = totalCivs;
		updateBanned(totalCivs, bannedCivs);

		allclicked = true;
	});

	//disable lek mod civs
	$('#forceNQ').change(function () {
		if (this.checked) {
			if (allclicked == false) {
				$("[data-civ='extra']").fadeTo("slow", 0.25, function () { $(this).css({ "text-decoration": "line-through", "background-color": "#1a1a1a" }); });;

				$.each(allCivs, function (index, value) {
					if (civilizations.extra.includes(index)) {
						allCivs[index] = false;
					}
				});

				//update the title
				totalCivs = baseCivCount;
				bannedCivs = 0;
				updateBanned(totalCivs, bannedCivs);
			}

			$(".forceNQ label").css({ "left": "43px" });
			$(this).prop("checked");
		} else {
			if (allclicked == false) {
				$("[data-civ='extra']").css({ "text-decoration": "none", "background-color": "#282828" });


				$("[data-civ='extra']").fadeTo("slow", 1, function () { });

				$.each(allCivs, function (index, value) {
					if (civilizations.extra.includes(index)) {
						allCivs[index] = true;
					}
				});

				//update the title
				totalCivs = civCount;
				bannedCivs = 0;
				updateBanned(totalCivs, bannedCivs);
			}

			$(".forceNQ label").css({ "left": "3px" });
			$(this).prop("unchecked");
		}
	});


	function updateBanned(totalAllowed, totalBanned) {
		var titleHTML = (totalAllowed - totalBanned) + " Allowed - " + totalBanned + " Banned";

		$(".selectorheadline").html(titleHTML);
	}

	// make the draft
	$('#create').click(function () {
		$('#create').attr("disabled", false);
		var players = $("#gameplayers option:selected").index() + 1;
		var rndpicks = $("#picks option:selected").index() + 1;
		var neededCivs = players * rndpicks;
		var enabledCivs = 0;
		var missingCivs = 0;
		var allowedCivs = [];
		var playerPicks = {};

		//clear any previous results
		$("#results").empty();

		//check how many civs are enabled
		$.each(allCivs, function (index, value) {
			if (allCivs[index] == true) {
				allowedCivs[enabledCivs] = index;
				enabledCivs++;
			};
		});

		if (neededCivs > civCount) {
			$("#results").html("<p class='drawerror'>There are not enough civilizations for " + players + " players to have " + rndpicks + " picks each!</br>Select a different number of players or lower the number of random picks and try again!</p>");
		} else if (enabledCivs < neededCivs) {
			missingCivs = neededCivs - enabledCivs;
			$("#results").html("<p class='drawerror'>There are not enough available civilizations to make the draw!</br>Please unban at least another " + missingCivs + " civilizations and try again!</p>");
		} else {
			const enableAutoCopy = ($('#enableAutoCopy').is(':checked'))
			// pick 3 rand civs for each player
			var i;
			var k;
			var picksHTML = enableAutoCopy ? "<p class='rescopied'>Draft results have been copied to clipboard</p>" : "";
			var resCopy = ""

			picksHTML = picksHTML + "<table class='drawresults'>";

			$("#results").css("text-align", "left");
			//loop thru each player
			for (i = 1; i <= players; i++) {

				//add this player to the results HTML
				picksHTML = picksHTML + "<tr><td>Player " + i + " choose from:</td>";
				resCopy = resCopy + "Player " + i + " choose from: - ";

				//loop however many picks are needed
				for (k = 1; k <= rndpicks; k++) {

					//loop thru the avlaiable civs and pick 3 at random
					var thisciv = Math.floor(Math.random() * allowedCivs.length);
					picksHTML = picksHTML + "<td><img src='img/" + allowedCivs[thisciv].toLowerCase() + ".png'></img>" + allowedCivs[thisciv];

					if (k < rndpicks) {
						picksHTML = picksHTML + "<td>";
						resCopy = resCopy + allowedCivs[thisciv] + " or ";
					} else {
						picksHTML = picksHTML + "<td>";
						resCopy = resCopy + allowedCivs[thisciv] + "\r\n";
					}

					// remove this item from the array, create new temp array and then assign it to allowed civs
					enabledCivs = 0;
					var tmpCivs = [];

					$.each(allowedCivs, function (index, value) {
						if (index != thisciv) {
							tmpCivs[enabledCivs] = value;
							enabledCivs++;
						};
					});

					allowedCivs = tmpCivs.slice();
				}

				picksHTML = picksHTML + "</br>"
			}

			picksHTML = picksHTML + "</table>"
			picksHTML = picksHTML + "<div id='copyresults'><input class='submitbutton' name='copyres' id='copyres' type='button' value='Copy Results' /></div>"
			$("#results").html(picksHTML);

			$("#copyTarget").val(resCopy);

			document.getElementById("copyres").addEventListener("click", function () {
				copyToClipboard(document.getElementById("copyTarget"));
			});

			if (enableAutoCopy) {
				$("#copyres").click();
			}

			function copyToClipboard(elem) {
				// create hidden text element, if it doesn't already exist
				var targetId = "_hiddenCopyText_";
				var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
				var origSelectionStart, origSelectionEnd;
				if (isInput) {
					// can just use the original source element for the selection and copy
					target = elem;
					origSelectionStart = elem.selectionStart;
					origSelectionEnd = elem.selectionEnd;
				} else {
					// must use a temporary form element for the selection and copy
					target = document.getElementById(targetId);
					if (!target) {
						var target = document.createElement("textarea");
						target.style.position = "absolute";
						target.style.left = "-9999px";
						target.style.top = "0";
						target.id = targetId;
						document.body.appendChild(target);
					}
					target.textContent = elem.textContent;
				}
				// select the content
				var currentFocus = document.activeElement;
				target.focus();
				target.setSelectionRange(0, target.value.length);

				// copy the selection
				var succeed;
				try {
					succeed = document.execCommand("copy");
				} catch (e) {
					succeed = false;
				}
				// restore original focus
				if (currentFocus && typeof currentFocus.focus === "function") {
					currentFocus.focus();
				}

				if (isInput) {
					// restore prior selection
					elem.setSelectionRange(origSelectionStart, origSelectionEnd);
				} else {
					// clear temporary content
					target.textContent = "";
				}
				return succeed;
			}
		}
	});
});

