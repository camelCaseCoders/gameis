(function() {
	var addEntity = function(entity) {
		return function(entities) {
			entities.push(entity);
		}
	};
	var removeEntity = function(entity) {
		return function(entities) {
			var index = entities.indexOf(entity);
			if(index !== -1) entities.splice(index, 1);		
		}
	};
	var Level = function(width, height, canvases) {
		this.width = width;
		this.height = height;
		this.canvases = canvases;
		
		this.entities = [];
		this.actions = [];
	};
	window.clearTimes = [];
	window.renderTimes = [];
	window.updateTimes = [];
	window.actionTimes = [];
	Level.prototype = {
		update: function(time, delta) {
			this.updating = true;

			//CLEAR ALL CANVASES
			clock.log();
			for(var i in this.canvases) {
				var canvas = this.canvases[i];
				canvas.ctx.clearRect(0, 0, canvas.element.width, canvas.element.height);
			}
			clearTimes.push(clock.elapsed());

			//UPDATE ALL ENTITIES
			clock.log();
			for(var i in this.entities) {
				this.entities[i].update(time, delta);
			}
			updateTimes.push(clock.elapsed());
			//RENDER ALL ENTITIES
			clock.log();
			for(var i in this.entities) {
				var entity = this.entities[i];
				entity.render(this.canvases[entity.layer].ctx);
			}
			renderTimes.push(clock.elapsed());

			//DO THE ACTIONS
			clock.log();
			while(this.actions.length > 0) {
				this.actions.pop()(this.entities);
			}
			actionTimes.push(clock.elapsed());

			this.updating = false;
		},
		addEntity: function(entity) {
			var add = addEntity(entity);
			if(this.updating) this.actions.push(add);
			else add(this.entities);
		},
		removeEntity: function(entity) {
			var remove = removeEntity(entity);
			if(this.updating) this.actions.push(remove);
			else remove(this.entities);
		}
	};
	window.Level = Level;
})();