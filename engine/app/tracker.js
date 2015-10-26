function Tracker(cb) {
    this.cb = cb;
    this.buffer = [];
}

Tracker.BLOCK_START = /^#([a-zA-Z:]*)$/;

Tracker.prototype = {
    append: function (line) {
        var tokens = line.match(Tracker.BLOCK_START);
        if (tokens) {
            this.flush();
            this.type = tokens[1];
        }
        this.buffer.push(line);
        return this;
    },
    flush: function () {
        if (this.buffer.length > 0) {
            this.cb(this.type, this.buffer);
            this.buffer = [];
        }
        this.type = null;
    }
};

module.exports = Tracker;