import { getContacts } from "@repo/data";
import { NavLink } from "./_nav-link";

export async function Nav({ q = "" }: { q?: string }) {
	const contacts = await getContacts(q);

	return (
		<nav>
			{contacts.length ? (
				<ul>
					{contacts.map((contact) => (
						<li key={contact.id}>
							<NavLink href={`/contacts/${contact.id}`}>
								{contact.first || contact.last ? (
									<>
										{contact.first} {contact.last}
									</>
								) : (
									<i>No Name</i>
								)}
								{contact.favorite ? <span>★</span> : null}
							</NavLink>
						</li>
					))}
				</ul>
			) : (
				<p>
					<i>No contacts</i>
				</p>
			)}
		</nav>
	);
}
