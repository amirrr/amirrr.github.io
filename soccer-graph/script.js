

function drawChart(i, graph) {
    // dimensions
    var width = 700;
    var height = 700;

    var margin = {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50,
    }

    // create an svg to draw in
    var svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr('id', 'graphSVG')
        .attr('class', 'h-100 d-flex align-items-center justify-content-center')
        .append('g')
        .attr('transform', 'translate(' + margin.top + ',' + margin.left + ')');        

    width = width - margin.left - margin.right;
    height = height - margin.top - margin.bottom;

    var linkWidthScale = d3.scaleLinear()
        .range([-1, 20]);
    var linkStrengthScale = d3.scaleLinear()
        .range([0, 0.45]);

    var simulation = d3.forceSimulation()
        // pull nodes together based on the links between them
        .force("link", d3.forceLink()
            .id(function(d) {
                return d.id;
            })
            .strength(function(d) {
                return linkStrengthScale(d.value);
            }))
        // push nodes apart to space them out
        .force("charge", d3.forceManyBody()
            .strength(-100))
        // add some collision detection so they don't overlap
        .force("collide", d3.forceCollide()
            .radius(60))
        // and draw them around the centre of the space
        .force("center", d3.forceCenter(width / 2, height / 2));

    // load the graph
    

        // var i = $("#priceRange").val()
        
        // set the nodes
        var nodes = graph.matches[i].nodes;
        // links between nodes
        var links = graph.matches[i].links;

        var color1 = {
            red: 19, green: 233, blue: 19
        };

        var color3 = {
            red: 255, green: 0, blue: 0
        };

        var color2 = {
            red: 255, green: 255, blue: 0
        };

        document.getElementById("match_name").textContent = graph.matches[i].matchname;

        linkWidthScale.domain(d3.extent(links, function(d) {
            return d.value;
        }));
        linkStrengthScale.domain(d3.extent(links, function(d) {
            return d.value;
        }));

        // add the curved links to our graphic
        var link = svg.selectAll(".link")
            .data(links)
            .enter()
            .append("path")
            .attr("class", "link")
            .attr('stroke', function(d) {
                return "#ddd";
            })
            .attr('stroke-width', function(d) {
                return linkWidthScale(d.weight);
            });

        // add the nodes to the graphic
        var node = svg.selectAll(".node")
            .data(nodes)
            .enter()
            .append("g")

        // a circle to represent the node
        node.append("circle")
            .attr("class", "node")
            .attr("r", 8)
            .attr("fill", function(d) {
                return d.colour;
            })
            .on("mouseover", mouseOver(.1))
            .on("mouseout", mouseOut);

        // hover text for the node
        node.append("title")
            .text(function(d) {
                return "player_api_id : " + d.api_id;
            });

        // add a label to each node
        node.append("text")
            .attr("dx", 12)
            .attr("dy", ".35em")
            .text(function(d) {
                return d.name;
            })
            .style("stroke", "black")
            .style("stroke-width", 0.5)
            .style("fill", function(d) {
                return d.colour;
            });

        // add the nodes to the simulation and
        // tell it what to do on each tick
        simulation
            .nodes(nodes)
            .on("tick", ticked);

        // add the links to the simulation
        simulation
            .force("link")
            .links(links);

        // on each tick, update node and link positions
        function ticked() {
            link.attr("d", positionLink);
            node.attr("transform", positionNode);
        }

        // links are drawn as curved paths between nodes,
        // through the intermediate nodes
        function positionLink(d) {
            var offset = 30;

            var midpoint_x = (d.source.x + d.target.x) / 2;
            var midpoint_y = (d.source.y + d.target.y) / 2;

            var dx = (d.target.x - d.source.x);
            var dy = (d.target.y - d.source.y);

            var normalise = Math.sqrt((dx * dx) + (dy * dy));

            var offSetX = midpoint_x + offset * (dy / normalise);
            var offSetY = midpoint_y - offset * (dx / normalise);

            return "M" + d.source.x + "," + d.source.y +
                "S" + offSetX + "," + offSetY +
                " " + d.target.x + "," + d.target.y;
        }

        // move the node based on forces calculations
        function positionNode(d) {
            // keep the node within the boundaries of the svg
            if (d.x < 0) {
                d.x = 0
            };
            if (d.y < 0) {
                d.y = 0
            };
            if (d.x > width) {
                d.x = width
            };
            if (d.y > height) {
                d.y = height
            };
            return "translate(" + d.x + "," + d.y + ")";
        }

        // build a dictionary of nodes that are linked
        var linkedByIndex = {};
        links.forEach(function(d) {
            linkedByIndex[d.source.index + "," + d.target.index] = 1;
        });

        // check the dictionary to see if nodes are linked
        function isConnected(a, b) {
            return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index] || a.index == b.index;
        }

        // fade nodes on hover
        function mouseOver(opacity) {
            return function(d) {
                // check all other nodes to see if they're connected
                // to this one. if so, keep the opacity at 1, otherwise
                // fade
                node.style("stroke-opacity", function(o) {
                    thisOpacity = isConnected(d, o) ? 1 : opacity;
                    return thisOpacity;
                });
                node.style("fill-opacity", function(o) {
                    thisOpacity = isConnected(d, o) ? 1 : opacity;
                    return thisOpacity;
                });
                // also style link accordingly
                link.style("stroke-opacity", function(o) {
                    return o.source === d || o.target === d ? 1 : opacity;
                });
                link.style("stroke", function(o) {
                    if(o.value > 0) {
                        var colorConnect = colorGradient(o.value/100, color3, color2, color1);
                    } else {
                        var colorConnect = "#ffbe63";
                    }
                    return o.source === d || o.target === d ? colorConnect : "#ffd9d9";
                });
            };
        }

        function mouseOut() {
            node.style("stroke-opacity", 1);
            node.style("fill-opacity", 1);
            link.style("stroke-opacity", 1);
            link.style("stroke", "#ddd");
        }

        function colorGradient(fadeFraction, rgbColor1, rgbColor2, rgbColor3) {
            var color1 = rgbColor1;
            var color2 = rgbColor2;
            var fade = fadeFraction;
        
            // Do we have 3 colors for the gradient? Need to adjust the params.
            if (rgbColor3) {
            fade = fade * 2;
        
            // Find which interval to use and adjust the fade percentage
            if (fade >= 1) {
                fade -= 1;
                color1 = rgbColor2;
                color2 = rgbColor3;
            }
            }
        
            var diffRed = color2.red - color1.red;
            var diffGreen = color2.green - color1.green;
            var diffBlue = color2.blue - color1.blue;
        
            var gradient = {
            red: parseInt(Math.floor(color1.red + (diffRed * fade)), 10),
            green: parseInt(Math.floor(color1.green + (diffGreen * fade)), 10),
            blue: parseInt(Math.floor(color1.blue + (diffBlue * fade)), 10),
            };
        
            return 'rgb(' + gradient.red + ',' + gradient.green + ',' + gradient.blue + ')';
        }

        // var data = [0, 1, 2, 3, 4, 5];
        // Step
        

    
}





d3.json("arsenal_match_data.json", function(error, graph) {

    drawChart(0, graph);
    
    var sliderStep = d3
    .sliderBottom()
    .min(0)
    .max(299)
    .width(300)
    .ticks(5)
    .step(1)
    .default(0)
    .on('onchange', val => {
        d3.select('p#value-step').text("Match Number: " + val);
        console.log(val);
        d3.select("svg#graphSVG").remove();
        drawChart(val, graph);
    });

    var gStep = d3
        .select('div#slider-step')
        .append('svg')
        .attr('width', 500)
        .attr('height', 100)
        .append('g')
        .attr('transform', 'translate(30,30)');

    gStep.call(sliderStep);

    d3.select('p#value-step').text("Match Number: " +sliderStep.value());

});




    