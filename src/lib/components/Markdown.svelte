<script lang="ts">
	import Markdown from "markdown-it";
	import MdItContainer from "markdown-it-container";
	import MdItEmoji from "markdown-it-emoji/bare";
	import MdItFootnote from "markdown-it-footnote";

	// @ts-expect-error no typings. the package is ancient
	import MdItHTML5Embed from "markdown-it-html5-embed";

	// @ts-expect-error see above
	import MdItSub from "markdown-it-sub";

	// @ts-expect-error see above
	import MdItSup from "markdown-it-sup";

	export let source: string;
	export let allowImages = true;

	/* Configuration lifted directly from lemmy-ui */

	let md = new Markdown({
		html: false,
		linkify: true,
		typographer: true,
	})
		.use(MdItSub)
		.use(MdItSup)
		.use(MdItFootnote)
		.use(MdItHTML5Embed, {
			html5embed: {
				useImageSyntax: true,
				attributes: {
					audio: 'controls preload="metadata"',
					video: 'controls loop preload="metadata"',
				},
			},
		})
		.use(MdItContainer, "spoiler", {
			validate: (params: string) => {
				return params.trim().match(/^spoiler\s+(.*)$/);
			},

			render: (tokens: any, idx: any) => {
				var m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/);

				if (tokens[idx].nesting === 1) {
					// opening tag
					return `<details><summary> ${md.utils.escapeHtml(m[1])} </summary>\n`;
				} else {
					// closing tag
					return "</details>\n";
				}
			},
		})
		.use(MdItEmoji, {
			/* TODO */
		});

	if (!allowImages) {
		md = md.disable("image");
	}
</script>

{@html md.render(source)}
