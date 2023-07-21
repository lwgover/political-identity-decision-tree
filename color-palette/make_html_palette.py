f = open("color-palette/color_palette.txt", "r")
colors = f.read().split("\n")
print
f = open("palette.html", "w")
f.write("<html>")
for color in colors:
    f.write("<div style=\"padding: 20px; background-color: " + color + "\"></div>")
f.write("</html>")
f.close()