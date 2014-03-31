var BookAsSystemViewModel = function() {
 var self = this; 

 self.playAll = ko.observable(false);

 self.refreshView = function() {
  $('#book-sys-animation').empty();
  self.explanations.removeAll();
  self.initSVG();
 }

 self.stepTitle = ko.observable();

 self.startPlayAll = function() {
   self.playAll(true);
   self.showLinearArtifact();
 }
 
 self.initSVG = function() { 
   
	 self.svgDraw = SVG('book-sys-animation').size('800', '400');
	 
	 self.ideaGroup = self.svgDraw.group();
	 self.ideaGroup.add(self.svgDraw.text("Idea").font({ size: 18 }).move(-20,20).rotate(-45));
	 self.ideaGroup.add(self.svgDraw.line(10, 48, 10, 90).stroke({ width: 1 })); 
	 self.ideaGroup.y(100);
	 
	 self.preArtifactSystem = self.svgDraw.group();
	 self.preArtifactSystem.add(self.svgDraw.line(15, 70, 150, 70 ).stroke({ 'dasharray': '5,5', width: 1 }));
	 self.preArtifactSystem.add(self.svgDraw.text("pre-artifact system").font({ size: 16 }).move(15, 72));
	 self.preArtifactSystem.move(self.ideaGroup.x(), self.ideaGroup.y()) 


	 self.publisher = self.svgDraw.group();
	 self.publisher.add(self.svgDraw.text("publisher").font({ size: 16 }).rotate(45).move(10, 15));
	 self.publisher.add(self.svgDraw.line(45, 60, 45, 140).stroke({ width: 1 }));
	 self.publisher.move(110, 75);

	 self.printer = self.svgDraw.group();
	 self.printer.add(self.svgDraw.text("printer").font({ size: 16 }).rotate(45).move(15, 0));
	 self.printer.add(self.svgDraw.line(45, 45, 45, 165).stroke({ width: 1 }));
	 self.printer.move(120, 75);

	 self.greatArtifact = self.svgDraw.group();
	 self.greatArtifact.add(self.svgDraw.rect(150, 150).fill({ color: 'rgb(35,31,32)' }));
	 self.artifact_label = self.svgDraw.text(function(add) {
	   add.tspan("The Great").newLine()
	   add.tspan("Immutable").newLine()
	   add.tspan("Artifact").newLine()}).font({ size: 18, 'text-transform': 'uppercase' }).fill({ color: 'rgb(255,255,255)' });
	 self.artifact_label.move(10,15); 
	 self.greatArtifact.add(self.artifact_label);
	 self.greatArtifact.move(175, 100);

	 var start_x = self.greatArtifact.x() + self.greatArtifact.y();

	 self.distributor = self.svgDraw.group();
	 self.distributor.add(self.svgDraw.text("distributor").font({ size: 16 }).move(-5, 35).rotate(-45)); 
	 self.distributor.add(self.svgDraw.line(30, 45, 30, 165).stroke({ width: 1 }));
	 self.distributor.move(305, 75);
	 
	self.library = self.svgDraw.group();
	 self.library.add(self.svgDraw.text("library").font({ size: 16 }).move(-10, 60).rotate(-45)); 
	 self.library.add(self.svgDraw.line(35, 60, 35, 140).stroke({ width: 1 }));
	 self.library.move(310, 75);

	self.pushBook = self.svgDraw.group();
	self.pushBook.add(self.svgDraw.line(0, 10, 100, 10).stroke({ width: 3 }));
	self.pushBook.add(self.svgDraw.polygon('105,10 100,5 100,15').fill({ color: 'rgb(0,0,0)' }).stroke({ width: 2 }));
	self.pushBook.move(350, 160);

	self.readers = self.svgDraw.group();
	self.readersLabel = self.svgDraw.text("Readers").font({ size: 18, 'text-transform': 'uppercase' }).move(-15,40).rotate(-45);
	self.readers.add(self.readersLabel); 
	self.readers.add(self.svgDraw.rect(100, 50).fill('none').stroke({ 'dasharray': '5,5', width: 1 }).move(5,70));
	for(var i=0;i<50;i++) {
	  var rand_x = Math.floor(Math.random()*100);
	  if(rand_x < 5) { rand_x = 5; }
	  var rand_y = Math.floor(Math.random()*50) + 70;
	  if(rand_y > 115) { rand_y = 115; }
	  self.readers.add(self.svgDraw.circle(10).fill({ color: 'rgb(255,0,0)' }).move(rand_x,rand_y));
	}
	self.readers.move(455, 70);

	self.lightBlub = self.svgDraw.group();
	self.lightBlub.add(self.svgDraw.image("{{ url_for('static', filename='img/idea_64x64.png') }}"));
	self.lightBlub.move(450, 10);
	self.lightBlub.hide();

        self.hemingway = self.svgDraw.group();
        self.hemingway.add(self.svgDraw.image("http://upload.wikimedia.org/wikipedia/commons/thumb/2/28/ErnestHemingway.jpg/192px-ErnestHemingway.jpg"));
        self.hemingway.hide();

	self.manuscript = self.svgDraw.group();
	self.manuscript.add(self.svgDraw.image("{{ url_for('static', filename='img/creative_writing_64x64.png') }}"));
	self.manuscript.move(30, 250);
	self.manuscript.hide();

        self.wintour = self.svgDraw.group();
        self.wintour.add(self.svgDraw.image("{{ url_for('static', filename='img/anna-wintour.png') }}"));
        self.wintour.hide();
       
	self.printBook = self.svgDraw.group();
	self.printBook.add(self.svgDraw.image("{{ url_for('static', filename='img/print_book.png') }}"));
	self.printBook.move(0, 0);
	self.printBook.hide();

        self.printingPress = self.svgDraw.group();
        self.printingPress.add(self.svgDraw.image("http://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Hoe%27s_one_cylinder_printing_press.png/320px-Hoe%27s_one_cylinder_printing_press.png"));
        self.printingPress.hide();

	self.explainText = ko.observable();

	self.firstStep = self.svgDraw.group();
	self.firstStep.add(self.ideaGroup);
	self.firstStep.add(self.preArtifactSystem);
	self.notFirstStep = self.svgDraw.group();

	self.notFirstStep.add(self.printer);
	self.notFirstStep.add(self.publisher);
	self.notFirstStep.add(self.greatArtifact);
	self.notFirstStep.add(self.distributor);
	self.notFirstStep.add(self.library);
	self.notFirstStep.add(self.pushBook);  
	self.notFirstStep.add(self.readers);  

	self.explanations = ko.observableArray();

	self.secondStep = self.svgDraw.group();
	//self.secondStep.add(self.printer)
	//self.secondStep.add(self.publisher);
	self.notSecondStep = self.svgDraw.group();

	self.thirdStep = self.svgDraw.group();
        self.forthStep = self.svgDraw.group();

 {#
	self.time = self.svgDraw.group();
	self.time.add(self.svgDraw.text("Time").font({ size: 18,
	             'text-transform': 'uppercase'}).fill('rgb(0,0,255)'));
	self.time.add(self.svgDraw.line(45, 15, 550, 15).stroke({ width: 3, color: 'rgb(0,0,255)'}));
	self.time.add(self.svgDraw.polygon("545,10 545,20 550,15").fill({ color: 'rgb(0,0,255)' }).stroke({ width: 2, color: 'rgb(0,0,255)' }));
	self.time.move(10, 350);
  #}
}

self.initSVG();

 self.showLinearArtifact = function() {
  self.stepTitle("1. Author's idea and manuscript");
  self.explanations.push({'paragraph': "The traditional writer's workflow starts with the author's idea"})
  self.notFirstStep.animate().opacity(0.5).scale(0.5, 0.5).after(function() {
   self.firstStep.animate().scale(1.5, 1.5).move(250,-100).after(function() {
    self.lightBlub.scale(0.5, 0.5);
    self.lightBlub.move(155, 165);
    self.explanations.push({'paragraph': "The author may or may not have a contract with a publisher"});
    self.lightBlub.show();
    self.hemingway.move(150, 250);
    self.hemingway.show();
    self.lightBlub.animate().scale(0.75,0.75).after(function() {
      self.lightBlub.animate().opacity(1.0).after(function() {
       self.lightBlub.animate().opacity(0.5).loop();
       self.manuscript.move(210, 260);
       self.manuscript.show();
       self.manuscript.animate().opacity(1.0).after(function() {
         self.explanations.push({'paragraph': "The author writes a manuscript, traditionally in isolation, with few contacts with readers"});
         self.manuscript.animate(4000).x(450).after(function() {  
          self.explanations.push({'paragraph': "Special Collections and Archives typically collect manuscripts often using TEI and EAD to describe the collection"});
           if(self.playAll()) {
             self.publishBook();
           }
           self.lightBlub.hide();
           self.hemingway.animate().x(20).after(function() { 
             self.manuscript.x(90);
           });
         });
     });
    });
  });
 });
});
}


 self.publishBook = function() {
  self.stepTitle("2. Publishing & Printing");
  self.explanations.removeAll();
  self.explanations.push({'paragraph': 'After receiving the manuscript, the editor and publisher work on a print-ready book'});

  self.firstStep.animate().opacity(0.5).move(0,0).scale(0.5, 0.5).after(function() {
     self.secondStep.add(self.publisher);
     self.publisher.animate().scale(2.0, 2.0).opacity(1.0).after(function() {
     self.publisher.x(120);
     self.printer.move(250,75);
     self.secondStep.add(self.printer);
     self.printer.animate().scale(2.0, 2.0).after(function() {
      self.wintour.move(240, 250);
      self.wintour.show();
      self.printingPress.move(self.printer.x() + 110, 240);
      self.printingPress.back().show();
      self.manuscript.front();
      self.explanations.push({'paragraph': 'After a few drafts between the author and editor, a final draft is ready'});
      self.printBook.move(self.wintour.x() - 10, self.manuscript.y());
      var counter = 0;
      self.manuscript.animate().x(210).loop(3).after(function() { 
        if(!self.printBook.visible()) {
          self.manuscript.hide();
          self.printBook.show();
        }
        self.printBook.animate(2000, '>', 4000).move(450,
                                                     self.printBook.y()).after(function() {
         
         self.publisher.animate().opacity(0.5).scale(0.5, 0.5).after(function() { {# move(55, 40).#}
          self.publisher.move(55, 40);
          self.wintour.animate().opacity(0.1);
          self.printer.animate().opacity(0.5).scale(0.5, 0.5).move(60, 40).after(function() {
           self.hemingway.animate().opacity(0.1);

	    self.printBook.add(self.svgDraw.text("now becomes").font(
            { size: 32, 
              'text-transform': 'uppercase' }).move(80,25));
              self.printBook.animate().x(100).after(function() {
                if(self.playAll()) {
                  self.greatImmutableArtifact();
                }
                self.printingPress.hide(); 
                self.hemingway.hide();
                self.wintour.hide(); 
                self.printBook.hide();
              });
           });
	  });
	 });
        });
      });
    });
   });
 }

 self.greatImmutableArtifact = function() {
   self.stepTitle("3. The Great Immutable Artifact");
   self.explanations.removeAll();
   self.explanations.push({'paragraph': "Craig Mod calls the printed book, the <i>Great Immutable Artifact</i>"});
   self.thirdStep.add(self.greatArtifact);
   self.greatArtifact.animate().scale(1.5,1.5).after(function() {
     self.explanations.push({'paragraph': "A book, once printed, assumes a number of properties libraries are interested in"});
     self.explanations.push({'paragraph': "RDA properties like ISBN, page numbers, illustrations"});
     var book_img = self.svgDraw.image("{{ url_for('static', filename='img/print_book.png') }}").scale(0.75, 0.75);
     book_img.move(50,79);
     self.greatArtifact.add(book_img);
     setTimeout(function() { 
       if(self.playAll()) {
          self.distributeAcquire();          
        } 
      }, 4000);
   });
 }

 self.distributeAcquire = function() {
   self.stepTitle("4. Distribution & Acquisition");
   self.explanations.removeAll();
   self.explanations.push({"paragraph": "After publication, the book is marketed by publisher"});
   self.greatArtifact.animate().opacity(0.5).scale(0.5, 0.5).move(90,45);
      self.forthStep.add(self.distributor);
   self.distributor.show();
   self.distributor.animate().scale(2.0, 2.0).x(100).after(function() {
      var book_image = self.svgDraw.image("{{ url_for('static', filename='img/print_book.png') }}").scale(0.75, 0.75).hide().move(50, 200);
      book_image.show();
      self.forthStep.add(self.library);
      self.library_stacks = self.svgDraw.image("{{ url_for('static', filename='img/library-stacks.jpg') }}").scale(2.0, 2.0).hide().move(310, 150);
      self.library.animate().scale(2.0, 2.0).opacity(1.0).x(200).after(function() {
         book_image.animate(4000).x(200).after(function() {
	 self.explanations.push({"paragraph": "The publisher sends the Book to the distributor"}); 
         self.library_stacks.back().show();
	 book_image.animate().x(310).after(function() {
	   self.forthStep.add(book_image); 
	   self.explanations.push({"paragraph": "The Library acquires the book, either through patron demand or collection policies"});
           setTimeout(function() {
             if(self.playAll()) {
              self.pushToReaders();
           }
          }, 10000);
	 });
     });
    });
 });
 }
 
 self.pushToReaders = function() {
   self.forthStep.hide();
   self.library_stacks.animate().x(30);   
   self.stepTitle("5. Push Book to Readers");
   self.explanations.removeAll();
   self.explanations.push({'paragraph': "Book is made available to patrons after shelving in the library's stacks"});
   self.fifthStep = self.svgDraw.group()
   self.fifthStep.add(self.readers);
   self.readersLabel.rotate(0);
   self.readers.animate().scale(2.0, 2.0).move(300, 20).after(function() { 
      self.explanations.push({'paragraph': "Reader finds Book through the library's catalog or requests Book from collection"});
      
   });
 }
 
   
}