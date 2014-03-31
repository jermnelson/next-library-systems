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
     editor.move(475, 320);
     var manuscript = view_model.svgDraw.image("{{ url_for('static', filename='img/creative_writing_64x64.png') }}");
     manuscript.move(225, 380); 
     manuscript.animate().loop(5).after(function() {
      manuscript.cx(450);
     });
    });
 });
}

var BookPostArtifactSystemModel = function() {
 var self = this;
  
 self.startPlayAll = function() {
   stepOne(self);
 }


 self.explanations = ko.observableArray();
 self.stepTitle = ko.observable();

 self.refreshView = function() {
  $('#book-digital-animation').empty();
  self.explanations.removeAll();
  self.initSVG();
 } 

self.initSVG = function() { 
 self.svgDraw = SVG('book-digital-animation').size('1000', '600');
 
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
 self.preArtifactSystem.add(self.svgDraw.circle(10).fill({ color: 'rgb(255,0,0)' }).move(60, 5));
 self.preArtifactSystem.add(self.svgDraw.circle(10).fill({ color: 'rgb(255,0,0)' }).move(50, 8));
 self.preArtifactSystem.add(self.svgDraw.circle(10).fill({ color: 'rgb(255,0,0)' }).move(55, 15));
 self.preArtifactSystem.add(self.svgDraw.circle(10).fill({ color: 'rgb(255,0,0)' }).move(65, 0));
 self.preArtifactSystem.add(self.svgDraw.circle(10).fill({ color: 'rgb(255,0,0)' }).move(75, 25));
 self.preArtifactSystem.add(self.svgDraw.circle(10).fill({ color: 'rgb(255,0,0)' }).move(75, -5));
 self.preArtifactSystem.add(self.svgDraw.circle(10).fill({ color: 'rgb(255,0,0)' }).move(85, 10));
 self.preArtifactSystem.add(self.svgDraw.circle(10).fill({ color: 'rgb(255,0,0)' }).move(90, -10));
 self.preArtifactSystem.add(self.svgDraw.circle(10).fill({ color: 'rgb(255,0,0)' }).move(95, -1));
 self.preArtifactSystem.add(self.svgDraw.circle(10).fill({ color: 'rgb(255,0,0)' }).move(92, 20));
 self.preArtifactSystem.add(self.svgDraw.circle(10).fill({ color: 'rgb(255,0,0)' }).move(110, 2));
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
