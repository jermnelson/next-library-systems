function stepOne(view_model) {
  view_model.stepTitle("1. Pre-artifact System");
  view_model.time.hide();
  view_model.printFlow.animate().opacity(0.5).scale(0.5, 0.5);
  view_model.digitalFlow.animate().opacity(0.5).scale(0.5, 0.5);
  view_model.postArtifactSystem.animate().scale(0.5, 0.5).opacity(0.5).move(130, 120).after(function() {; ;
    view_model.preArtifactSystem.animate().scale(2.0,2.0).move(200, 40).after(function() {
     view_model.explanations.push({ paragraph: "The work's creative spark could start with the author, publisher, or potential readers"});
     var author = view_model.svgDraw.group();
     author.add(view_model.svgDraw.image("http://upload.wikimedia.org/wikipedia/commons/thumb/2/28/ErnestHemingway.jpg/192px-ErnestHemingway.jpg"));
     author.add(view_model.svgDraw.text("Author").move(10, 100));
     author.move(200, 320);
     var editor = view_model.svgDraw.group();
     editor.add(view_model.svgDraw.image("{{ url_for('static', filename='img/anna-wintour.png') }}"));
     editor.add(view_model.svgDraw.text("Editor").move(10, 100));
     editor.move(475, 320);
     view_model.manuscript = view_model.svgDraw.image("{{ url_for('static', filename='img/word.png') }}");
     view_model.manuscript.move(225, 380); 
     view_model.manuscript.animate().cx(475).after(function() {
      view_model.preArtifactSystemReaders.animate().y(90).after(function() {
       view_model.explanations.push({ paragraph: "Readers can engage the author through social media and other analytics" });
       $('#features-functions').children().last().after("<li>Support reader annotations such as comments, on incomplete creative works?</li>");
       view_model.manuscript.animate().move(300, 270).after(function() { 
         view_model.manuscript.animate().move(224, 380).after(function() {
          setTimeout(function() {
            author.remove();
            editor.remove();
            view_model.preArtifactSystem.animate().scale(0.5,0.5).move(0,100).opacity(0.5); 
            view_model.manuscript.hide();
            view_model.preArtifactSystemReaders.y(0); 
           // stepTwo(view_model);

          }, 5000);
         });
       });
      });
     });
    });
 });
}

function stepTwo(view_model) {
 view_model.stepTitle("2. Print Flow");
 view_model.explanations.removeAll();
 view_model.explanations.push({ paragraph: "At this point, the classic model and the post-artifact model diverge"}); 
 view_model.printFlow.animate().scale(1.75,1.75).x(-250).opacity(1.0).during(function() { 
   view_model.artifact_label.move(10, 40).rotate(0);
 }).after(function() {
   var book_img = view_model.svgDraw.image("{{ url_for('static', filename='img/print_book.png') }}");
   book_img.move(350,300).hide();
   view_model.manuscript.move(0, 400).show();
   view_model.manuscript.animate().move(300, 350).after(function() { 
     view_model.explanations.push({ paragraph: "The print-flow for the post-artifact looks similar to the classic model" });
   view_model.manuscript.hide();
    view_model.explanations.push({ paragraph: "A MARC record is either produced from Publisher metadata, Original cataloging, or various hybrids"});
    view_model.explanations.push({ paragraph: "Embedding RDA into our MARC records allows us to better describe different textual manifestations"});
   book_img.show();
   book_img.animate(3000,'>', 5000).x(600).after(function() {
    view_model.explanations.push({ paragraph: "The key difference is that the printed artifact is not longer privileged"});
    var firstPartPrintFlow = view_model.svgDraw.group();
     firstPartPrintFlow.add(view_model.print);
     firstPartPrintFlow.add(view_model.printer);
     firstPartPrintFlow.add(view_model.immutableArtifact);
     firstPartPrintFlow.animate().scale(0.75, 0.75).move(-30,10).opacity(0.5).after(function() { 
       view_model.distributionChannels.animate().x(view_model.distributionChannels.x() - 275).during(function() {
         book_img.animate().x(view_model.distributionChannels.x()+100).after(function() { 
           var library_stacks = view_model.svgDraw.image("{{ url_for('static', filename='img/library-stacks.jpg') }}").scale(2.0,2.0).hide();
           library_stacks.back().move(300, 150).show();
           book_img.animate().move(350, 200).scale(0.2, 0.2).after(function() {
            firstPartPrintFlow.animate().scale(0.5,0.5).move(0, 5);
            view_model.distributionChannels.animate().scale(0.3, 0.3).move(200, 5).opacity(0.5).after(function() { 
              library_stacks.remove();
              book_img.remove();
              //stepThree(view_model);
             });

           });
         });
       });
     });

   });
  });
 });
}

function stepThree(view_model) {
 view_model.stepTitle("3. Digital Artifact Flow");
 view_model.explanations.removeAll();
 view_model.explanations.push({ paragraph: "The digital artifact is different from the print manifestation"});
 var activeStepThree = view_model.svgDraw.group();
 activeStepThree.add(view_model.digitalFlow.opacity(1.0));
 activeStepThree.add(view_model.postArtifactSystem.y(150).opacity(1.0));
 activeStepThree.move(0,0).animate().scale(2.0,2.0).after(function() { 
  view_model.explanations.push({ paragraph: "Converting between binary and text formats is easier than print-to-digital"});  
  setTimeout(function() {
    view_model.explanations.push({ paragraph: "Beside various very-large commercial DRM and eBook silos (iTunes, Amazon, Google Play), ePub3 standard is slowly emerging for digital books"});
  }, 3000);
  view_model.explanations.push({ paragraph: "In the animation, the red dashed lines are reader interactions with both the print and digital artifacts"});
  $('#features-functions').children().last().after("<li>How will the system support different and restricted copyrights?</li>");
  $('#features-functions').children().last().after("<li><a href='http://www.idpf.org/epub/30/spec/'>ePub3</a> streams?</li>");
  $('#features-functions').children().last().after("<li>Manage the additional complexities of digital objects?</li>");
//   view_model.time.show();


 });

}

var BookPostArtifactSystemModel = function() {
 var self = this;
 self.stepCount = 0; 
 
 self.startPlayAll = function() {
  switch(self.stepCount) {
   case 0:
     stepOne(self);
     break;

   case 1:
     stepTwo(self);
     break;

   case 2: 
     stepThree(self);
     break;
  
  }
  self.stepCount += 1;
 }


 self.explanations = ko.observableArray();
 self.stepTitle = ko.observable();

 self.refreshView = function() {
  $('#book-digital-animation').empty();
  self.explanations.removeAll();
  self.initSVG();
  self.stepCount = 0; 

 } 

self.initSVG = function() { 
 self.svgDraw = SVG('book-digital-animation').size('900', '600');
 
 self.preArtifactSystem = self.svgDraw.group();
 self.preArtifactSystem.add(self.svgDraw.text("Idea").font({ size: 18 }).move(-20,20).rotate(-45));
 self.preArtifactSystem.add(self.svgDraw.line(10, 48, 10, 90).stroke({ width: 1 })); 
 self.preArtifactSystem.add(self.svgDraw.line(15, 70, 155, 70 ).stroke({ 'dasharray': '5,5', width: 1 }));
 self.preArtifactSystem.add(self.svgDraw.text("pre-artifact system").font({ size: 16 }).move(15, 70));
 var rightArrow = self.svgDraw.group();
 rightArrow.add(self.svgDraw.polygon('118,25 125,20 118,18').fill({ color: 'rgb(0,0,0)' }).stroke({ width: 2 }));
 rightArrow.add(self.svgDraw.line(120, 20, 150, 65).stroke({ width: 3 }));
 //rightArrow.animate().move(rightArrow.x()-2, rightArrow.y()-2).loop();
 self.preArtifactSystem.add(rightArrow);
 self.preArtifactSystemReaders = self.svgDraw.group();
 self.preArtifactSystemReaders.add( self.svgDraw.circle(10).fill({ color: 'rgb(255,0,0)' }).move(60, 5));
 self.preArtifactSystemReaders.add(self.svgDraw.circle(10).fill({ color: 'rgb(255,0,0)' }).move(50, 8));
 self.preArtifactSystemReaders.add(self.svgDraw.circle(10).fill({ color: 'rgb(255,0,0)' }).move(55, 15));
 self.preArtifactSystemReaders.add(self.svgDraw.circle(10).fill({ color: 'rgb(255,0,0)' }).move(65, 0));
 self.preArtifactSystemReaders.add(self.svgDraw.circle(10).fill({ color: 'rgb(255,0,0)' }).move(75, 25));
 self.preArtifactSystemReaders.add(self.svgDraw.circle(10).fill({ color: 'rgb(255,0,0)' }).move(75, -5));
 self.preArtifactSystemReaders.add(self.svgDraw.circle(10).fill({ color: 'rgb(255,0,0)' }).move(85, 10));
 self.preArtifactSystemReaders.add(self.svgDraw.circle(10).fill({ color: 'rgb(255,0,0)' }).move(90, -10));
 self.preArtifactSystemReaders.add(self.svgDraw.circle(10).fill({ color: 'rgb(255,0,0)' }).move(95, -1));
 self.preArtifactSystemReaders.add(self.svgDraw.circle(10).fill({ color: 'rgb(255,0,0)' }).move(92, 20));
 self.preArtifactSystemReaders.add(self.svgDraw.circle(10).fill({ color: 'rgb(255,0,0)' }).move(110, 2));
 self.preArtifactSystem.add(self.preArtifactSystemReaders);
 var leftArrow = self.svgDraw.group();
 leftArrow.add(self.svgDraw.polygon('40,63 30,65 32,55').fill({ color: 'rgb(0,0,0)' }).stroke({ width: 2 }));
 leftArrow.add(self.svgDraw.line(35, 60, 65, 20).stroke({ width: 3 }));
 //leftArrow.animate().move(leftArrow.x()-1, leftArrow.y()-2).loop();
 self.preArtifactSystem.add(leftArrow);
  
 self.preArtifactSystem.add(self.svgDraw.line(155, 40, 155, 150).stroke({ width: 1 }));
 self.preArtifactSystem.add(self.svgDraw.text("publisher / author").font({ size: 14 }).move(50,-50).rotate(25));
 self.preArtifactSystem.y(160);
 self.preArtifactSystem.move(0, 200) 

 self.digitalFlow = self.svgDraw.group(); 
 self.printFlow = self.svgDraw.group(); 

 self.print = self.svgDraw.group();
 self.print.add(self.svgDraw.line(155, 70, 300, -30).stroke({ 'dasharray': '5,5', width: 1 }));
 self.print.add(self.svgDraw.text("Print").font({ size: 16, 
                                                  'text-transform': 'uppercase' }).rotate(-35).move(100,125));
 self.print.y(200);

  
 self.digital = self.svgDraw.group();
 self.digital.add(self.svgDraw.line(155, 70, 250, 130).stroke({ 'dasharray': '5,5', width: 1 }));
 self.digital.add(self.svgDraw.text("Digital").font({ size: 16, 
                                                    'text-transform': 'uppercase' }).rotate(34).move(180, -35));
 self.digital.y(200);
 self.digitalFlow.add(self.digital); 

 self.immutableArtifact = self.svgDraw.group();
 self.immutableArtifact.add(self.svgDraw.rect(150, 150).fill({ color: 'rgb(35,31,32)' }));
 self.artifact_label = self.svgDraw.text(function(add) {
   add.tspan("The ")
   add.tspan("Great").fill('rgb(128,128,128)').attr({ 'text-decoration': 'line-through'}).newLine()
   add.tspan("Immutable").newLine()
   add.tspan("Artifact").newLine()}).font({ size: 18, 'text-transform': 'uppercase' }).fill({ color: 'rgb(255,255,255)' });
 self.artifact_label.move(-40,60).rotate(-45); 
 self.immutableArtifact.add(self.artifact_label);
 self.immutableArtifact.scale(0.85, 0.85).move(310, 100);

 self.printer = self.svgDraw.group();
 self.printer.add(self.svgDraw.text("printer").font({ size: 16 }).rotate(35).move(20, -10));
 self.printer.add(self.svgDraw.line(45, 45, 45, 145).stroke({ width: 1 }));
 self.printer.move(255, 75);
 
 self.distributionChannels = self.svgDraw.group();
 self.distributionChannels.add(self.svgDraw.text(function(add) {
   add.tspan("distributor,").newLine()
   add.tspan("author homepage,").newLine()
   add.tspan("amazon, etc").newLine()}).font({ size: 16 }).rotate(-35).y(80));
 self.distributionChannels.add(self.svgDraw.line(85, 110, 85, 210).stroke({ width: 1 }));
 self.distributionChannels.x(360) 

 self.printFlow.add(self.print);
 self.printFlow.add(self.printer);
 self.printFlow.add(self.immutableArtifact);
 self.printFlow.add(self.distributionChannels);

 self.digitalArtifact = self.svgDraw.group();
 self.digitalArtifact.add(self.svgDraw.text(function(add) {
    add.tspan("Digital").newLine()
 	add.tspan("Artifact").newLine()}).font({ size: 16,
	                                         weight: 'bold',
		  				 'text-transform': 'uppercase'}).rotate(-35));
 self.digitalArtifact.add(self.svgDraw.line(15, 20, 15, 120).stroke({ width: 3 }));
 self.digitalArtifact.move(240, 260);
 self.digitalFlow.add(self.digitalArtifact);

 self.postArtifactSystem = self.svgDraw.group();
 self.postArtifactSystem.add(self.svgDraw.line(0, 15, 25, 15).stroke({ width: 2, color: "rgb(255,0,0)" }));
 self.postArtifactSystem.add(self.svgDraw.line(20, 10, 25, 15).stroke({ width: 2, color: "rgb(255,0,0)" }));
 self.postArtifactSystem.add(self.svgDraw.line(20, 20, 25, 15).stroke({ width: 2, color: "rgb(255,0,0)" }));
 self.postArtifactSystem.add(self.svgDraw.circle(10).fill({ color: 'rgb(255,0,0)' }).move(25, 10));
 self.postArtifactSystem.add(self.svgDraw.line(30, 0, 30, 100).stroke({ width: 2,
                                                                        color: "rgb(255,0,0)",
									'dasharray': '2,2'}));
 self.postArtifactSystem.add(self.svgDraw.line(30, 30, 45, 30).stroke({ width: 2, color: "rgb(255,0,0)" }));
 self.postArtifactSystem.add(self.svgDraw.line(40, 25, 45, 30).stroke({ width: 2, color: "rgb(255,0,0)" }));
 self.postArtifactSystem.add(self.svgDraw.line(40, 35, 45, 30).stroke({ width: 2, color: "rgb(255,0,0)" }));
 self.postArtifactSystem.add(self.svgDraw.circle(10).fill({ color: 'rgb(255,0,0)' }).move(45, 25));  
 self.postArtifactSystem.add(self.svgDraw.line(50, 0, 50, 100).stroke({ width: 2,
									color: "rgb(255,0,0)",
								        'dasharray': '2,2'})); 
 self.postArtifactSystem.add(self.svgDraw.line(50, 45, 90, 45).stroke({ width: 2, color: "rgb(255,0,0)" }));
 self.postArtifactSystem.add(self.svgDraw.line(85, 40, 90, 45).stroke({ width: 2, color: "rgb(255,0,0)" }));
 self.postArtifactSystem.add(self.svgDraw.line(85, 50, 90, 45).stroke({ width: 2, color: "rgb(255,0,0)" }));
 self.postArtifactSystem.add(self.svgDraw.circle(10).fill({ color: 'rgb(255,0,0)' }).move(90, 40));  
 self.postArtifactSystem.add(self.svgDraw.line(95, 0, 95, 100).stroke({ width: 2,
								        color: "rgb(255,0,0)",
									'dasharray': '2,2'})); 
 self.postArtifactSystem.add(self.svgDraw.line(95, 60, 150, 60).stroke({ width: 2, color: "rgb(255,0,0)" }));
 self.postArtifactSystem.add(self.svgDraw.line(145, 55, 150, 60).stroke({ width: 2, color: "rgb(255,0,0)" }));
 self.postArtifactSystem.add(self.svgDraw.line(145, 65, 150, 60).stroke({ width: 2, color: "rgb(255,0,0)" }));
 self.postArtifactSystem.add(self.svgDraw.circle(10).fill({ color: 'rgb(255,0,0)' }).move(150, 55));  
 self.postArtifactSystem.add(self.svgDraw.line(155, 0, 155, 100).stroke({ width: 2,
								          color: "rgb(255,0,0)",
								          'dasharray': '2,2'}));
 self.postArtifactSystem.add(self.svgDraw.line(155, 20, 170, 20).stroke({ width: 2, color: "rgb(255,0,0)" }));
 self.postArtifactSystem.add(self.svgDraw.line(165, 15, 170, 20).stroke({ width: 2, color: "rgb(255,0,0)" }));
 self.postArtifactSystem.add(self.svgDraw.line(165, 25, 170, 20).stroke({ width: 2, color: "rgb(255,0,0)" }));
 self.postArtifactSystem.add(self.svgDraw.circle(10).fill({ color: 'rgb(255,0,0)' }).move(170, 15));  
 self.postArtifactSystem.add(self.svgDraw.line(175, 0, 175, 100).stroke({ width: 2,
																		color: "rgb(255,0,0)",
																		'dasharray': '2,2'}));
 self.postArtifactSystem.add(self.svgDraw.line(175, 85, 320, 85).stroke({ width: 2, color: "rgb(255,0,0)" }));
 self.postArtifactSystem.add(self.svgDraw.line(315, 80, 320, 85).stroke({ width: 2, color: "rgb(255,0,0)" }));
 self.postArtifactSystem.add(self.svgDraw.line(315, 90, 320, 85).stroke({ width: 2, color: "rgb(255,0,0)" }));
 self.postArtifactSystem.add(self.svgDraw.circle(10).fill({ color: 'rgb(255,0,0)' }).move(320, 80));  
 self.postArtifactSystem.add(self.svgDraw.line(325, 0, 325, 100).stroke({ width: 2,
																		color: "rgb(255,0,0)",
																		'dasharray': '2,2'}));
 self.postArtifactSystem.move(255, 280); 
 
 self.time = self.svgDraw.group();
 self.time.add(self.svgDraw.text("Time").font({ size: 18,
		  									    'text-transform': 'uppercase'}).fill('rgb(0,0,255)'));
 self.time.add(self.svgDraw.line(45, 15, 550, 15).stroke({ width: 3, color: 'rgb(0,0,255)'}));
 self.time.add(self.svgDraw.polygon("545,10 545,20 550,15").fill({ color: 'rgb(0,0,255)' }).stroke({ width: 2, color: 'rgb(0,0,255)' }));
 self.time.move(10, 420);
 }

 self.initSVG();
}
