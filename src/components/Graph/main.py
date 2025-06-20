class LimitGraph(Scene):
    def __init__(self, epsilon): 
        self.epsilon = epsilon
        super().__init__()

    def construct(self):
        epsilon = abs(self.epsilon)
        delta = min(epsilon / 5, 1)

        a = 2
        L = 4
        ysd = min(0, L - epsilon) - 1
        xsd = min(0, a - delta) - 1

        axes = Axes(
            x_range=[xsd, a + delta + 1, 1],  # X o'qidagi qadamni 1 qilib belgilash
            y_range=[ysd, L + epsilon + 1, 1],
            x_length=12,
            y_length=8,
            axis_config={"color": BLUE},
            x_axis_config={
                "include_numbers": False,
            },
            y_axis_config={
                "include_numbers": False,
            },
        )

        labels = axes.get_axis_labels(x_label="x", y_label="f(x)")
        graph = axes.plot(lambda x: x ** 2, color=YELLOW)

        x_left = a - delta
        x_right = a + delta
        y_lower = L - epsilon
        y_upper = L + epsilon

        points = [a - delta / 2 - delta / 4,a - delta / 4, a, a + delta / 4,a + delta / 2 + delta / 4]
        point_coords = [axes.c2p(x, x ** 2) for x in points]
        point_markers = [Dot(coord, color=GREEN, radius=0.04) for coord in point_coords]

        point_labels = VGroup(
            MathTex(f"({a - delta / 2 - delta / 4:.2f}, {(a - delta / 2 - delta / 4) ** 2:.2f})", font_size=12).next_to(point_coords[0], LEFT * 0.1),
            MathTex(f"({a - delta / 4:.2f}, {(a - delta / 4) ** 2:.2f})", font_size=12).next_to(point_coords[1], RIGHT * 0.1),
            MathTex(f"({a}, {a**2})", font_size=12).next_to(point_coords[2], LEFT * 0.1),
            MathTex(f"({a + delta / 4:.2f}, {(a + delta / 4) ** 2:.2f})", font_size=12).next_to(point_coords[3], RIGHT * 0.1),
            MathTex(f"({a + delta / 2 + delta / 4:.2f}, {(a + delta / 2 + delta / 4) ** 2:.2f})", font_size=12).next_to(point_coords[4], LEFT * 0.1),
        )

        y_delta_lower_line = axes.get_horizontal_line(axes.c2p(x_right, y_lower), color=RED, line_func=DashedLine)
        y_delta_upper_line = axes.get_horizontal_line(axes.c2p(x_right, y_upper), color=RED, line_func=DashedLine)
        x_delta_left_line = axes.get_vertical_line(axes.c2p(x_left, y_upper), color=GREEN, line_func=DashedLine)
        x_delta_right_line = axes.get_vertical_line(axes.c2p(x_right, y_upper), color=GREEN, line_func=DashedLine)

        # Axes, graph, and labels
        self.play(Create(axes), Write(labels))
        self.play(Create(graph))
        self.wait(2)
        # X-axis labels for specific points (a-delta, a, a+delta)
        x_values = [a - delta, a, a + delta]
        x_labels = VGroup()
        cont=0
        for x in x_values:
            if cont%2==1:

                x_decimal = DecimalNumber(x, num_decimal_places=2, font_size=10)
                x_decimal.next_to(axes.c2p(x, 0), UP)
                x_labels.add(x_decimal)
            else:
                x_decimal = DecimalNumber(x, num_decimal_places=2, font_size=8)
                x_decimal.next_to(axes.c2p(x, 0), DOWN)
                x_labels.add(x_decimal)
            cont+=1
        self.play(Write(x_labels))
        # Y-axis labels
        y_values = [y_lower, L, y_upper]
        y_labels = VGroup()
        for y in y_values:
            y_decimal = DecimalNumber(y, num_decimal_places=2, font_size=10)
            y_decimal.next_to(axes.c2p(0, y), LEFT)
            y_labels.add(y_decimal)
        self.play(Write(y_labels))

        

        # Delta lines
        self.play(Create(x_delta_left_line), Create(x_delta_right_line))
        self.play(Create(y_delta_lower_line), Create(y_delta_upper_line))

        # Point markers and labels
        self.play(Create(VGroup(*point_markers)))
        self.play(Write(point_labels))

        self.wait(2)
