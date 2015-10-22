 $(document).ready(function(){

 	var books = {

			book1:   {
				id : "book_1",
			   	title : "The Great Gatsby",
			   	category : "novel",
				author : "F. Scott Fitzgerald",
				price : "$9.99",
				description : "A 1925 novel written by American author F. Scott Fitzgerald that follows a cast of characters living in the fictional town of West Egg on prosperous Long Island in the summer of 1922. The story primarily concerns the young and mysterious millionaire Jay Gatsby and his quixotic passion and obsession for the beautiful former debutante Daisy Buchanan. -Wikipedia",
				image : '<img src="https://upload.wikimedia.org/wikipedia/en/b/b0/Gatsby_1925_jacket.gif">'

			}, book2 : {
				id : "book_2",
				title : "The Scarlet Letter",
				category : "novel",
				author : "Nathaniel Hawthorne",
				price : "$10.99",
				description : "Set in 17th-century Puritan Boston, Massachusetts, during the years 1642 to 1649, it tells the story of Hester Prynne, who conceives a daughter through an affair and struggles to create a new life of repentance and dignity. Throughout the book, Hawthorne explores themes of legalism, sin, and guilt. -Wikipedia",
				image : '<img src="http://ecx.images-amazon.com/images/I/51E-lPPSn2L._SY344_BO1,204,203,200_.jpg">'

			},book3 : {
				id : "book_3",
				title : "The Adventures of Huckleberry Finn",
				category : "novel",
				author : "Mark Twain",
				price : "$12.99",
				description : "Commonly named among the Great American Novels, the work is among the first in major American literature to be written throughout in vernacular English, characterized by local color regionalism. It is told in the first person by Huckleberry 'Huck' Finn, a friend of Tom Sawyer and narrator of two other Twain novels (Tom Sawyer Abroad and Tom Sawyer, Detective). -Wikipedia",
				image : '<img src="https://javamama.files.wordpress.com/2009/09/adventures_of_huckleberry_finn.jpg">'

			}, book4 : {
				id : "book_4",
				title : "Of Mice and Men",
				category : "novel",
				author : "John Steinbeck",
				price : "$8.99",
				description : "A novel written by author John Steinbeck. Published in 1937, it tells the story of George Milton and Lennie Small, two displaced migrant ranch workers, who move from place to place in search of new job opportunities during the Great Depression in California, United States. =Wikipedia",
				image : '<img src="http://ecx.images-amazon.com/images/I/51wuHv30-ML._SY344_BO1,204,203,200_.jpg">'

			}, book5 : {
				id : "book_5",
				title : "To Kill a Mockingbird",
				category : "novel",
				author : "Harper Lee",
				price : "$7.99",
				description : "a novel by Harper Lee published in 1960. It was immediately successful, winning the Pulitzer Prize, and has become a classic of modern American literature. The plot and characters are loosely based on the author's observations of her family and neighbors, as well as on an event that occurred near her hometown in 1936, when she was 10 years old. -Wikipedia",
				image : '<img src="https://upload.wikimedia.org/wikipedia/en/7/79/To_Kill_a_Mockingbird.JPG">'

			}
		};	

		// Weather obj
		var weather = {

			weather1:   {
				id : "San*Francisco",
			   	city : "San Francisco",
			   	tempurature : "novel",
				time : "F. Scott Fitzgerald",
				population : "1,000,000",
			}	
		};

	
		// This function will empty the book_container
		var empty_book_container = function() {
			$('.book_container').empty();
		};

		var empty_search_container = function() {
			$('#search_container').hide();
		};
		empty_search_container();


		//  This function appends books to the main page
		var append_book = function(book) {
			var $target = $('<div id="' + book.id + '" class="row"><div class"col-12"><hr><div class"row">');
			var $largeCol = $('<div class="col-10"></div>');
			var $smallCol = $('<div class="col-2"></div>');
				$target.append($largeCol);
				$target.append($smallCol);
				$('.book_container').append($target);
				$largeCol.append($('<h2>').text(book.title));
				$largeCol.append($('<h5>').text(book.author));
				$largeCol.append($('<p>').text(book.description));
				$largeCol.append($('<h5>').text(book.price));
				$smallCol.append($('<div>').html(book.image));
		};

		//This function iterates through the book object
		var append_all_books = function(book_list) {
			for(var book_index in book_list) {
				var book = book_list[book_index];
				append_book(book);
			}	
		};


		// This loops through all the books in the books object
		$('#view_all_books_button').click(function(event) {
			empty_book_container();
			append_all_books(books);
		});

		// This is creates a source array for the Autocomplete search input
		var find_book_names = function (books) {
			var book_names = [];
			for(var key in books) {
				(book_names).push(books[key].title);
			}
			console.log(book_names);
			return book_names;
		};


		// This is the autocomplete for the 'Input Search'
		$( "#search_title_input" ).autocomplete({
		  	
		  	source: find_book_names(books)
			});

		// This is the search book title function
		$('#search_title_button').click(function () {
			empty_book_container();
			var book_title = $('#search_title_input').val();
			console.log('This is the book title: ' + book_title);
			search_object_title(books, book_title);
		});

		var search_object_title = function (book_list, title) {
			for(var book_index in book_list) {
				if(book_list[book_index].title === title) {
					var book = book_list[book_index];
					console.log('This is the selected book object: ' + book);
					append_book(book);
				}
			}
		};

		// This is a toggle click event that shows the search bar 
		$('#search_book_title').click(function(event) {
			$('#search_container').toggle();
		});

		// This is a toggle click event that shows the weather
		$('#view_local_weather').click(function(event) {
			$('#weather_container').toggle();
		});


		// This is an ajax function that GETs the weather data
		var weather_data = {};

		$.ajax({
		  method: 'GET',
		  url: 'http://api.openweathermap.org/data/2.5/weather?q=San+Francisco&APPID=e34a336f00ea195cb222ed6453eb16b9',
		  success: function(data){
		  	to_be_run_on_server_response(data);
		    console.log(data);
		  },
		  error: function(jqHXR, status) {
		  	console.log('ERROR: ', status);
		  }
		});

		// This is the temperature converter
		var temp_converter = function(k_temp) {
			var f_temp = Math.floor((k_temp * 1.8 - 459.67) + 1);
			console.log(f_temp);
			return f_temp
		};

		// This function appends the weather to the weather container
		var to_be_run_on_server_response = function(data){
			var temp = temp_converter(data.main.temp);
		  $('#weather_city').append('<h4>' + data.name + ' Weather:</h4>');
		  $('#weather_description').append('<h6>' + data.weather[0].description + '</h6>');
		  $('#weather_humidity').append('<h6>Humidity is ' + data.main.humidity + '%</h6>');
		  $('#weather_wind').append('<h6>And the wind is blowing at ' + data.wind.speed + 'mph</h6>');
		  $('#weather_temperature').append('<h2>' + temp + 'F</h2>');
		};
		// to_be_run_on_server_response(data.main.name);




		




 });