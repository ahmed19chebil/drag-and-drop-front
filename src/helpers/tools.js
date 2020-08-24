export const RGBAToHex = (r, g, b, a) => {
	r = r.toString(16);
	g = g.toString(16);
	b = b.toString(16);
	if (r.length == 1) r = "0" + r;
	if (g.length == 1) g = "0" + g;
	if (b.length == 1) b = "0" + b;
	a = ((a * 255) | (1 << 8)).toString(16).slice(1);
	return "#" + r + g + b + a;
};
