const OpenModalbtn = document.querySelector(".buttonRow button");
const bookmark = document.querySelector("#bookmark");
const overlay = document.querySelector(".overlay");
const totalBacked = document.querySelector("#total-backed h2");
const backers = document.querySelector("#total-backers h2");
const pledgeConditons = {"noReward":0, "bamboo" : 25, "black" : 75 , "mahogany" : 200};
const selectRewardBtns = document.querySelectorAll(".stockBtn");
const modal = document.getElementById("modal");
const closeModalBtn = document.querySelector("#modal svg");
const openButtons = document.querySelectorAll(".stockBtn");
const selects = document.querySelectorAll(".selection-chooseArea label");
const continueBtns = document.querySelectorAll(".continue");
const confirmed = document.querySelector(".confirmation");
const confirmBtn = document.getElementById("confirm");
const totalRaised = document.querySelector("#totalRaised")
let totalFund = 0 ;
let totalbackers ;


const toggleModal = ()=>{
	modal.classList.toggle("active");
}

const closeModal = ()=>{
	toggleOverlay();
	toggleModal();
}

bookmark.addEventListener("click",()=>{
	setTimeout(()=>{
	bookmark.classList.toggle("active");
	if(bookmark.classList.contains("active")){
		bookmark.querySelector("p").textContent = "Bookmarked"
	}else{
		bookmark.querySelector("p").textContent = "Bookmark";
	}
},300)
})

OpenModalbtn.addEventListener("click",()=>{
	toggleOverlay();
	toggleModal()
})

const toggleOverlay = ()=>{
	overlay.classList.toggle("active");
	document.querySelector(".menu").classList.toggle("inactive");
}

selectRewardBtns.forEach(btn=>{
	btn.addEventListener("click",()=>{
		toggleOverlay();
		toggleModal();
		clearSelect()
		selectNewOption(btn.parentElement.parentElement.id);

	})
})


overlay.addEventListener("click",(e)=>{
	if(e.target.className != "modal" ){
		clearSelect();
 		closeModal();
	}
})

closeModalBtn.addEventListener("click",()=>{
	closeModal();
	clearSelect();
})


// Select Options
const selectNewOption = (selectedOption)=>{
	const parent = document.querySelector(`.selection #${selectedOption}`).parentElement.parentElement;
	parent.classList.toggle("active");

	current = parent;
	const pledge = parent.querySelector(`.selection-pledgeArea`);	
	pledge.style.maxHeight = pledge.scrollHeight + "px";

	setTimeout(() => {
    parent.scrollIntoView({ behavior: "smooth"});
  }, 500);
 
}

const clearSelect = ()=>{
	const select = document.querySelector(".selection.active");
	const currentInput = document.querySelector(".selection.active .selection-pledgeArea input");
	if(select){
		const pledge = document.querySelector(
      ".selection.active .selection-pledgeArea"
    );
	select.classList.remove("active");
	currentInput.value = '';
	currentInput.parentElement.classList.remove("invalid")
	pledge.style.maxHeight = 0;
	}

}

selects.forEach(btn=>{
	btn.addEventListener("click",(e)=>{
			clearSelect();
			selectNewOption(btn.previousElementSibling.id);
	})
})


const updateStock = ()=>{
	const selector = document.querySelector(".selection.active .selection-chooseArea input").id;
	const stockStat = document.querySelector(`#${selector} .stock-con h1`);
	const modalStock = document.querySelector(`.selection.active .selection-chooseArea h2`);
	const selectedModalStock = document.querySelector(".selection.active");
	const selectedOption = document.querySelector(`#${selector}.option`);


	if(selector !== "noReward"){
		const newStock = (Number(stockStat.innerHTML)-1);
		stockStat.innerHTML = newStock.toString();
		modalStock.innerHTML = newStock.toString();

		if(newStock === 0){
			selectedModalStock.querySelector(".continue").innerHTML = "Out of Stock";
			selectedOption.querySelector(".stockBtn").innerHTML = "Out of Stock";
			selectedModalStock.classList.add("inactive");
			selectedOption.classList.add("inactive");
		}
	}
}

// Form Validation
continueBtns.forEach(btn=>{
	btn.addEventListener("click",()=>{
		const pledgeInput = document.querySelector(`.selection.active .pledge-Form input`);
		const pledgename = pledgeInput.getAttribute("name"); 
		totalFund = Number(pledgeInput.value);

		if(!totalFund || totalFund < pledgeConditons[pledgename]){
			pledgeInput.parentElement.classList.add("invalid");
		}else{
			pledgeInput.parentElement.classList.remove("invalid");
			pledgeInput.value = '';

			updateStock();
			toggleModal()
			toggleOverlay();
			clearSelect();
			setTimeout(()=>{	
				confirmation()
			},1000)	
		}
	})
})


const confirmation = ()=>{
	overlay.classList.toggle("active");
	document.querySelector(".menu").classList.toggle("inactive");
	confirmed.classList.toggle("active");

	const Raised = Math.round(parseFloat(totalRaised.innerHTML.replace(",","")) + totalFund);
	let newRaised = Raised.toString();

	const Backed = Math.round(
    parseFloat(totalBacked.innerHTML.replace(",", "")) + 1);
	let newBackers = Backed.toString();


	for(let i = 3; i < newRaised.length; i += 4){
		newRaised = newRaised.slice(0,-i) + ',' + newRaised.slice(-i);
		console.log(Raised)
		console.log(newRaised)
	}

	for (let i = 3; i < newBackers.length; i += 4) {
    newBackers.slice(0, -i) + "," + newBackers.slice(-i);
    }

	totalRaised.innerHTML = newRaised;
	// totalBacked.innerHTML = newBackers

}

confirmBtn.addEventListener("click",()=>{
	toggleOverlay();
	confirmed.classList.toggle("active")
})