class SvgFilter {

  constructor(svgContainer) {
    this.defs = svgContainer.append('defs');
    this.clipPath = this.defs.append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('width', 0)
      .attr('height', 0);
    this.genesClipPath = this.defs.append('clipPath')
      .attr('id', 'genes-clip')
      .append('rect')
      .attr('width', 0)
      .attr('height', 0);
    this.drawPattern();
  }

  renderClipPath(width, height) {
    this.clipPath
      .attr('width', width)
      .attr('height', height);
  }

  renderGenesClipPath(width, height) {
    this.genesClipPath
      .attr('width', width)
      .attr('height', height);
  }


  drawPattern() {
    this.defs.append('pattern')
      .attr('id', 'fill-tilted')
      .attr('patternUnits', 'userSpaceOnUse')
      .attr('width', 2)
      .attr('height', 10)
      .attr('patternTransform', 'rotate(45)')
      .append('rect')
      .attr('height', 10)
      .attr('width', 1)
      .style('fill', '#999999')
      .style('opacity', 0.5);
  }

  drawShadow(id = 'md-shadow', deviation = 2, offset = 2, slope = 0.25) {
    // create filter and assign provided id
    var filter = this.defs.append('filter')
      .attr('height', '125%') // adjust this if shadow is clipped
      .attr('id', id);

    // ambient shadow into ambientBlur
    // may be able to offset and reuse this for cast, unless modified
    filter.append('feGaussianBlur')
      .attr('in', 'SourceAlpha')
      .attr('stdDeviation', deviation)
      .attr('result', 'ambientBlur');

    // cast shadow into castBlur
    filter.append('feGaussianBlur')
      .attr('in', 'SourceAlpha')
      .attr('stdDeviation', deviation)
      .attr('result', 'castBlur');

    // offsetting cast shadow into offsetBlur
    filter.append('feOffset')
      .attr('in', 'castBlur')
      .attr('dx', offset - 1)
      .attr('dy', offset)
      .attr('result', 'offsetBlur');

    // combining ambient and cast shadows
    filter.append('feComposite')
      .attr('in', 'ambientBlur')
      .attr('in2', 'offsetBlur')
      .attr('result', 'compositeShadow');

    // applying alpha and transferring shadow
    filter.append('feComponentTransfer')
      .append('feFuncA')
      .attr('type', 'linear')
      .attr('slope', slope);

    // merging and outputting results
    var feMerge = filter.append('feMerge');
    
    //outputting results
    feMerge.append('feMergeNode');

    feMerge.append('feMergeNode')
      .attr('in', 'SourceGraphic');
  }

  renderGradients(chromosomes) {
    let gradients = this.defs.selectAll('linearGradient')
      .data(chromosomes, (d,i) => d.chromosome)
      .enter()
      .append('linearGradient')
        .attr('id', (d,i) => 'gradient' + d.chromosome)
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '0%')
        .attr('y2', '100%')
        .attr('spreadMethod', 'pad');

    gradients.append('stop')
        .attr('offset', '25%')
        .attr('stop-color', '#FFF')
        .attr('stop-opacity', 1);

    gradients.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', (d,i) => d.color)
        .attr('stop-opacity', 1);
  }

}