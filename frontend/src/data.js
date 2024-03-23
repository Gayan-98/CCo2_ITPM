export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  java: "15.0.2",
  typescript: "5.0.3",
  python: "3.10.0",
  php: "8.2.3",
};


export const CODE_SNIPPETS = {
  javascript: `
function greet(name) {
    console.log("Hello, " + name + "!");
}

greet("Emily");
`,
  typescript: `
type Params = {
    name: string;
}

function greet(data: Params) {
    console.log("Hello, " + data.name + "!");
}

greet({ name: "Emily" });
`,
  python: `
def greet(name):
    print("Hello, " + name + "!")

greet("Emily")
`,
  java: `
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Emily!");
    }
}
`,

  php: `<?php

$name = 'Emily';
echo "Hello, $name!";
`,
};
