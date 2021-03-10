---
title: Archive
layout: archive
permalink: /resources/category
---

<!-- This loops through the paginated posts -->
{% for post in paginator.posts %}
	{% include resource.html %}
{% endfor %}

<!-- Pagination links -->
{% if paginator.total_pages > 1 %}
<div class="wo-stacked">
	{% if paginator.previous_page %}
	<div class="resources__archives-cta">
		<a href="{{ paginator.previous_page_path }}" class="button pagination__button">Previous Page</a>
	</div>
	{% endif %}

	{% if paginator.next_page %}
	<div class="resources__archives-cta">
		<a href="{{ paginator.next_page_path }}" class="button pagination__button">Next Page</a>
	</div>
	{% endif %}
</div>
{% endif %}