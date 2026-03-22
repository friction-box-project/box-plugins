export type NodeId =
	| 'hello' | 'variables' | 'types' | 'functions' | 'control_flow'
	| 'ownership' | 'references' | 'slices' | 'structs' | 'enums'
	| 'error_handling' | 'collections';

export type NodeStatus = 'completed' | 'active' | 'available' | 'locked';

export interface TreeNode {
	id: NodeId;
	label: string;
	chapter: string;
	x: number;
	y: number;
	prereqs: NodeId[];
	milestone?: true;
}

export interface Exercise {
	title: string;
	concept: string;
	starter: string;
	checks: string[];
	hint: string;
}

export const VIEWBOX = '0 0 200 520';

export const NODES: TreeNode[] = [
	{ id: 'hello', label: 'Hello World', chapter: '1', x: 100, y: 30, prereqs: [] },
	{ id: 'variables', label: 'Variables', chapter: '3.1', x: 55, y: 100, prereqs: ['hello'] },
	{ id: 'types', label: 'Data Types', chapter: '3.2', x: 145, y: 100, prereqs: ['hello'] },
	{ id: 'functions', label: 'Functions', chapter: '3.3', x: 55, y: 170, prereqs: ['variables'] },
	{ id: 'control_flow', label: 'Control Flow', chapter: '3.5', x: 145, y: 170, prereqs: ['types'] },
	{ id: 'ownership', label: 'Ownership', chapter: '4.1', x: 100, y: 245, prereqs: ['functions', 'control_flow'], milestone: true },
	{ id: 'references', label: 'References', chapter: '4.2', x: 55, y: 315, prereqs: ['ownership'] },
	{ id: 'slices', label: 'Slices', chapter: '4.3', x: 145, y: 315, prereqs: ['ownership'] },
	{ id: 'structs', label: 'Structs', chapter: '5', x: 55, y: 385, prereqs: ['references'] },
	{ id: 'enums', label: 'Enums & Match', chapter: '6', x: 145, y: 385, prereqs: ['slices'] },
	{ id: 'error_handling', label: 'Error Handling', chapter: '9', x: 55, y: 455, prereqs: ['structs'] },
	{ id: 'collections', label: 'Collections', chapter: '8', x: 145, y: 455, prereqs: ['enums'] },
];

export const EDGES: [NodeId, NodeId][] = [
	['hello', 'variables'],
	['hello', 'types'],
	['variables', 'functions'],
	['types', 'control_flow'],
	['functions', 'ownership'],
	['control_flow', 'ownership'],
	['ownership', 'references'],
	['ownership', 'slices'],
	['references', 'structs'],
	['slices', 'enums'],
	['structs', 'error_handling'],
	['enums', 'collections'],
];

const NODE_MAP = new Map(NODES.map(n => [n.id, n]));
export const getNode = (id: NodeId) => NODE_MAP.get(id)!;

export function nodeStatus(id: NodeId, completed: Set<string>, activeId: string | null): NodeStatus {
	if (completed.has(id)) return 'completed';
	if (id === activeId) return 'active';
	const node = getNode(id);
	if (node.prereqs.every(p => completed.has(p))) return 'available';
	return 'locked';
}

export function nextAvailable(completed: Set<string>): NodeId | null {
	for (const node of NODES) {
		if (completed.has(node.id)) continue;
		if (node.prereqs.every(p => completed.has(p))) return node.id;
	}
	return null;
}

export function edgePath(fromId: NodeId, toId: NodeId): string {
	const f = getNode(fromId);
	const t = getNode(toId);
	const my = (f.y + t.y) / 2;
	return `M ${f.x} ${f.y} C ${f.x} ${my}, ${t.x} ${my}, ${t.x} ${t.y}`;
}

export const STARS = Array.from({ length: 60 }, (_, i) => ({
	x: ((i * 137.5 + 17) % 196) + 2,
	y: ((i * 97.3 + 9) % 510) + 5,
	r: 0.3 + ((i * 7) % 5) * 0.12,
	o: 0.05 + ((i * 13) % 7) * 0.025,
}));

export const EXERCISES: Record<NodeId, Exercise> = {
	hello: {
		title: 'Your First Program',
		concept: 'In Rust, println is a macro — macros use ! after the name.',
		hint: 'Change println(...) to println!(...)',
		starter: 'fn main() {\n    println("Hello, Rust!");\n}',
		checks: ['println!'],
	},
	variables: {
		title: 'Mutability',
		concept: 'Variables are immutable by default. Use mut to allow reassignment.',
		hint: 'Declare with: let mut x = 5;',
		starter: 'fn main() {\n    let x = 5;\n    x = 10;\n    println!("x = {}", x);\n}',
		checks: ['let mut'],
	},
	types: {
		title: 'Type Annotations',
		concept: 'Rust needs a type annotation when it cannot infer from context.',
		hint: 'Add a type: let x: i32 = ...',
		starter: 'fn main() {\n    let x = "42".parse().expect("NaN");\n    println!("x + 1 = {}", x + 1);\n}',
		checks: ['i32'],
	},
	functions: {
		title: 'Function Signatures',
		concept: 'Every parameter must have a type annotation, and return types use ->.',
		hint: 'fn add(a: i32, b: i32) -> i32',
		starter: 'fn add(a, b) {\n    a + b\n}\n\nfn main() {\n    println!("3 + 5 = {}", add(3, 5));\n}',
		checks: ['i32', '->'],
	},
	control_flow: {
		title: 'If Expressions',
		concept: 'if blocks are expressions. All branches must be covered when returning a value.',
		hint: 'Add an else branch returning "zero"',
		starter: 'fn describe(n: i32) -> &\'static str {\n    if n > 0 {\n        "positive"\n    } else if n < 0 {\n        "negative"\n    }\n}\n\nfn main() {\n    println!("{}", describe(0));\n}',
		checks: ['"zero"'],
	},
	ownership: {
		title: 'Move Semantics',
		concept: 'Assigning a String to another variable moves ownership. The original becomes invalid.',
		hint: 'Clone the value: let s2 = s1.clone();',
		starter: 'fn main() {\n    let s1 = String::from("hello");\n    let s2 = s1;\n    println!("{} {}", s1, s2);\n}',
		checks: ['.clone()'],
	},
	references: {
		title: 'Borrowing',
		concept: 'Functions can borrow values with & instead of taking ownership.',
		hint: 'Change parameter to &String and pass &s',
		starter: `fn calculate_length(s: String) -> usize {\n    s.len()\n}\n\nfn main() {\n    let s = String::from("hello");\n    let len = calculate_length(s);\n    println!("'{}' is {} bytes", s, len);\n}`,
		checks: ['&'],
	},
	slices: {
		title: 'String Slices',
		concept: 'Prefer &str over &String in parameters — it accepts both String refs and literals.',
		hint: 'Change &String to &str',
		starter: 'fn greet(name: &String) {\n    println!("Hello, {}!", name);\n}\n\nfn main() {\n    let name = String::from("Rustacean");\n    greet(&name);\n    greet("world"); // Won\'t work with &String!\n}',
		checks: ['&str'],
	},
	structs: {
		title: 'Defining Structs',
		concept: 'Structs group related data. Methods live in impl blocks.',
		hint: 'struct Rectangle { width: f64, height: f64 } and impl with fn area(&self)',
		starter: '// Define a Rectangle struct with width and height (f64)\n// Add a method area() that returns width * height\n\nfn main() {\n    let rect = Rectangle { width: 30.0, height: 50.0 };\n    println!("Area: {}", rect.area());\n}',
		checks: ['struct Rectangle', 'fn area'],
	},
	enums: {
		title: 'Pattern Matching',
		concept: 'match must handle every enum variant. Each arm uses => to map to a value.',
		hint: 'match coin { Coin::Penny => 1, Coin::Nickel => 5, ... }',
		starter: 'enum Coin {\n    Penny,\n    Nickel,\n    Dime,\n    Quarter,\n}\n\nfn value(coin: Coin) -> u32 {\n    // Use match to return the cent value\n    0\n}\n\nfn main() {\n    println!("Quarter = {} cents", value(Coin::Quarter));\n}',
		checks: ['match', '=>'],
	},
	error_handling: {
		title: 'The Result Type',
		concept: 'Fallible operations return Result<T, E>. Handle both Ok and Err.',
		hint: 'match input.parse::<i32>() { Ok(n) => ..., Err(e) => ... }',
		starter: 'fn main() {\n    let input = "42";\n    // parse() returns Result, not i32 directly.\n    // Use match to handle Ok and Err.\n    let n: i32 = input.parse();\n    println!("parsed: {}", n);\n}',
		checks: ['match', 'Ok'],
	},
	collections: {
		title: 'Vectors',
		concept: 'Vec<T> is a growable array. Create with vec![], grow with push(), iterate with for.',
		hint: 'let mut v = vec![1, 2, 3]; v.push(4); for x in &v { ... }',
		starter: 'fn main() {\n    // Create a mutable vector with 1, 2, 3\n    // Push 4 and 5\n    // Print each value with a for loop\n}',
		checks: ['vec!', '.push(', 'for'],
	},
};
